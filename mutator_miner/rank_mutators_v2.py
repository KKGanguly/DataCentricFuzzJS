#!/usr/bin/env python3
"""
rank_mutators.py   model-driven crash-centric template ranker

WHY HARDCODED NODE-TYPE WEIGHTS ARE WRONG
------------------------------------------
The original version hardcoded weights like try_statement=1.0, for_statement=0.9
based on general intuition about JS engine stress. This is wrong for two reasons:

1. The crash predictor model already encodes which features matter.
   Using a hand-rolled table overrides a trained signal with gut feeling.
   If the model has learned that 'recursive_iife_depth' is a strong predictor
   but 'uses_try_catch' is not, the hardcoded table would rank backwards.

2. Template importance should be measured by which features it INJECTS
   and how important those features are to the model  not what AST node
   it targets.

FEATURE IMPORTANCE ESTIMATION (three tiers, automatic fallback)
----------------------------------------------------------------
Tier 1  Load model directly:
  Looks for .pkl/.joblib files in the DataCentricFuzzJS tree.
  Calls model.feature_importances_ or model.coef_.

Tier 2  API perturbation importance (model-agnostic):
  importance(f) = predict({f:1, others:0}) - predict({all:0})
  Cached to feature_importance_cache.json after first run.
  One-time cost: ~177 API calls.

Tier 3  Empirical correlation (always works):
  importance(f) = mean(gain | f changed across all mutations)
  Captures interaction effects that tiers 1/2 miss.

RANKING SIGNALS (all model-derived, no hardcoding)
---------------------------------------------------
1. crash_rate             (w=0.40)  crashes/applied via d8 (ground truth)
2. feature_injection_score (w=0.25)  sum importance(f) for features injected
3. mean_predicted_gain    (w=0.15)  mean scorer gain across files
4. gain_consistency       (w=0.15)  1 - CV(gains)
5. applicability_rate     (w=0.05)  fraction of files template can apply to

TEMPLATE JSON INVARIANT
------------------------
Output templates are VERBATIM copies. Only "rank" and "evaluation" are added.
"""

import os, sys, json, re, random, argparse, tempfile, subprocess, time, hashlib
import statistics
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, field
from multiprocessing import Pool, cpu_count

import requests

sys.path.insert(0, os.path.dirname(__file__))
from apply_learned_mutators_v2 import analyze_scope, apply_mutation, ts_syntax_ok

JS_ENGINE_PATH = os.environ.get(
    "JS_ENGINE_PATH",
    "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8",
)
JS_ENGINE_ARGS = ["--allow-natives-syntax", "--expose-gc"]
PREDICT_URL    = "http://localhost:5000/predict"
FEATURE_CMD    = ["python3.13", "../feature_extractor_cli.py", "file", "--i", None, "--format", "string"]
IMPORTANCE_CACHE = "feature_importance_cache.json"
D8_TIMEOUT     = 6.0

W_CRASH_RATE   = 0.40
W_FEAT_INJECT  = 0.25
W_MEAN_GAIN    = 0.15
W_CONSISTENCY  = 0.15
W_APPLY        = 0.05

assert abs(W_CRASH_RATE + W_FEAT_INJECT + W_MEAN_GAIN + W_CONSISTENCY + W_APPLY - 1.0) < 1e-9


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# TIER 1  load model directly
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def _find_model_files() -> List[Path]:
    search_roots = [
        Path(os.environ.get("JS_ENGINE_PATH", "")).parent.parent.parent,
        Path.home() / "DataCentricFuzzJS",
        Path("."), Path(".."),
    ]
    found = []
    for root in search_roots:
        if not root.exists():
            continue
        for ext in ["*.pkl", "*.joblib", "*.model"]:
            for p in root.rglob(ext):
                try:
                    if p.stat().st_size > 1000:
                        found.append(p)
                except Exception:
                    pass
    return found


def _importance_from_model_file(path: Path) -> Optional[Dict[str, float]]:
    try:
        import joblib
        obj = joblib.load(path)
    except Exception:
        try:
            import pickle
            with open(path, "rb") as f:
                obj = pickle.load(f)
        except Exception:
            return None

    model = obj
    if hasattr(obj, "named_steps"):
        model = list(obj.named_steps.values())[-1]
    if hasattr(obj, "best_estimator_"):
        model = obj.best_estimator_

    feature_names: Optional[List[str]] = None
    for attr in ("feature_names_in_", "feature_names_", "feature_names"):
        if hasattr(model, attr):
            feature_names = list(getattr(model, attr))
            break
    if feature_names is None and hasattr(obj, "named_steps"):
        for step in obj.named_steps.values():
            if hasattr(step, "get_feature_names_out"):
                try:
                    feature_names = list(step.get_feature_names_out())
                    break
                except Exception:
                    pass

    importances: Optional[List[float]] = None
    if hasattr(model, "feature_importances_"):
        importances = list(model.feature_importances_)
    elif hasattr(model, "coef_"):
        coef = model.coef_
        if hasattr(coef, "flatten"):
            coef = coef.flatten()
        importances = [abs(float(c)) for c in coef]

    if importances is None or feature_names is None:
        return None
    if len(importances) != len(feature_names):
        return None

    max_imp = max(importances) if importances else 1.0
    if max_imp == 0:
        return None
    return {name: imp / max_imp for name, imp in zip(feature_names, importances)}


def try_load_importance_from_model() -> Optional[Dict[str, float]]:
    for path in _find_model_files():
        result = _importance_from_model_file(path)
        if result:
            print(f"[+] Loaded feature importance from model: {path} ({len(result)} features)")
            return result
    return None


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# TIER 2  API perturbation importance
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def _get_feature_names_from_extractor(sample_js: str) -> Optional[List[str]]:
    tmp = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(sample_js)
            tmp = f.name
        cmd = FEATURE_CMD.copy()
        cmd[4] = tmp
        r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                           text=True, timeout=20)
        raw = r.stdout.strip()
        if not raw:
            return None
        return [str(pair.split("=", 1)[0].strip())
                for pair in raw.split(",") if "=" in pair]
    except Exception:
        return None
    finally:
        if tmp:
            try: os.unlink(tmp)
            except: pass


def _predict(feats: Dict) -> float:
    try:
        r = requests.post(PREDICT_URL, json=feats, timeout=8)
        data = r.json()
        if "error" in data:
            return 0.0
        return float(data.get("probability", 0.0))
    except Exception:
        return 0.0


def compute_perturbation_importance(feature_names: List[str]) -> Dict[str, float]:
    """
    importance(f) = predict({f:1, others:0}) - predict({all:0})
    Cached after first run.
    """
    cache_key = hashlib.md5(json.dumps(sorted(feature_names)).encode()).hexdigest()
    if os.path.exists(IMPORTANCE_CACHE):
        try:
            cached = json.load(open(IMPORTANCE_CACHE))
            if cached.get("_cache_key") == cache_key:
                imp = {k: v for k, v in cached.items() if not k.startswith("_")}
                print(f"[+] Loaded perturbation importance from cache ({len(imp)} features)")
                return imp
        except Exception:
            pass

    print(f"[+] Computing perturbation importance ({len(feature_names)} features, {len(feature_names)+1} API calls)...")
    zero = {name: 0 for name in feature_names}
    base_p = _predict(zero)
    print(f"    Baseline p={base_p:.4f}")

    raw: Dict[str, float] = {}
    for i, feat in enumerate(feature_names):
        p = zero.copy()
        p[feat] = 1
        raw[feat] = _predict(p) - base_p
        if (i + 1) % 30 == 0:
            print(f"    {i+1}/{len(feature_names)}")

    abs_vals = [abs(v) for v in raw.values()]
    max_abs = max(abs_vals) if abs_vals else 1.0
    normalized = {k: abs(v) / max_abs for k, v in raw.items()} if max_abs > 0 else {k: 0.0 for k in raw}

    cache_data = dict(normalized)
    cache_data["_cache_key"] = cache_key
    cache_data["_base_probability"] = base_p
    cache_data["_raw_importances"] = raw
    try:
        with open(IMPORTANCE_CACHE, "w") as f:
            json.dump(cache_data, f, indent=2)
        print(f"[+] Importance cached to {IMPORTANCE_CACHE}")
    except Exception as e:
        print(f"[!] Cache write failed: {e}")

    top = sorted(normalized.items(), key=lambda x: x[1], reverse=True)[:10]
    print(f"[+] Top 10 features by perturbation importance:")
    for name, imp in top:
        print(f"    {name:<45} {imp:.4f}  (raw delta={raw[name]:+.4f})")

    return normalized


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# TIER 3  empirical correlation
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def finalize_empirical_importance(empirical: Dict[str, List[float]]) -> Dict[str, float]:
    """
    importance(f) = mean(gain | f changed) * log(1 + n_obs)
    Observation count weighting makes single-sample features less reliable.
    """
    import math
    result = {}
    for f, gains in empirical.items():
        mean_gain = sum(gains) / len(gains)
        obs_weight = math.log1p(len(gains))
        result[f] = max(0.0, mean_gain * obs_weight)
    max_v = max(result.values()) if result else 1.0
    return {k: v / max_v for k, v in result.items()} if max_v > 0 else result


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# FEATURE INJECTION SCORE
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def feature_injection_score(
    base_feats: Dict,
    mut_feats: Dict,
    importance: Dict[str, float],
) -> float:
    """
    score = sum( importance(f) * |delta(f)| ) for all changed features,
    normalized to [0, 1] by total importance mass.
    """
    if not importance:
        return 0.0
    total_importance = sum(importance.values()) or 1.0
    injected = 0.0
    for f, imp in importance.items():
        bv = base_feats.get(f, 0)
        mv = mut_feats.get(f, 0)
        try:
            delta = abs(float(mv) - float(bv))
        except (TypeError, ValueError):
            delta = 1.0 if bv != mv else 0.0
        injected += imp * delta
    return min(1.0, injected / total_importance)


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# HELPERS
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def _run_d8(code: str) -> int:
    tmp = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(code)
            tmp = f.name
        p = subprocess.run(
            [JS_ENGINE_PATH, tmp] + JS_ENGINE_ARGS,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            timeout=D8_TIMEOUT,
        )
        return p.returncode
    except subprocess.TimeoutExpired:
        return -1
    except Exception:
        return -1
    finally:
        if tmp:
            try: os.unlink(tmp)
            except: pass


def _extract_features(js_path: str) -> Dict:
    cmd = FEATURE_CMD.copy()
    cmd[4] = js_path
    try:
        r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                           text=True, timeout=20)
        raw = r.stdout.strip()
        if not raw:
            return {}
        d = {}
        for pair in raw.split(","):
            if "=" not in pair:
                continue
            k, v = pair.split("=", 1)
            key = str(k.strip())
            try:
                val = eval(v.strip(), {"__builtins__": {}})
                if isinstance(val, bool):    val = bool(val)
                elif isinstance(val, int):   val = int(val)
                elif isinstance(val, float): val = float(val)
                else: val = str(val)
            except Exception:
                val = v.strip()
            d[key] = val
        return d
    except Exception:
        return {}


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# PER-TEMPLATE EVALUATION WORKER
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

@dataclass
class TemplateEval:
    template_idx: int
    crash_rate: float = 0.0
    feat_inject_score: float = 0.0
    mean_gain: float = 0.0
    gain_consistency: float = 0.0
    applicability: float = 0.0
    total_applied: int = 0
    total_crashes: int = 0
    files_tried: int = 0
    files_applied: int = 0
    feat_delta_gains: Dict[str, List[float]] = field(default_factory=dict)
    final_score: float = 0.0


def _evaluate_one_template(args: Tuple) -> TemplateEval:
    (idx, template, file_paths, n_muts,
     importance, run_d8_flag, run_scorer, seed) = args
    random.seed(seed)

    ev = TemplateEval(template_idx=idx)
    all_gains: List[float] = []
    all_fis: List[float] = []

    for path_str in file_paths:
        path = Path(path_str)
        try:
            code = path.read_text(errors="ignore")
        except Exception:
            continue
        if not code.strip():
            continue

        ev.files_tried += 1
        base_feats: Dict = {}
        if run_scorer and importance:
            base_feats = _extract_features(path_str)

        bindings = analyze_scope(code)
        applied_here = 0
        attempts = 0

        while applied_here < n_muts and attempts < n_muts * 15:
            attempts += 1
            mutated, msg = apply_mutation(code, template, bindings, validate=False)
            if mutated is None or not ts_syntax_ok(mutated):
                continue

            applied_here += 1
            ev.total_applied += 1

            if run_d8_flag:
                rc = _run_d8(mutated)
                if rc != 1 and rc != 0:   # exit>1 or timeout = crash
                    ev.total_crashes += 1

            if run_scorer and importance and base_feats:
                mut_tmp = None
                try:
                    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
                        f.write(mutated)
                        mut_tmp = f.name
                    mut_feats = _extract_features(mut_tmp)
                    if mut_feats:
                        base_p = _predict(base_feats)
                        mut_p  = _predict(mut_feats)
                        gain = mut_p - base_p
                        all_gains.append(gain)
                        fis = feature_injection_score(base_feats, mut_feats, importance)
                        all_fis.append(fis)
                        # Accumulate per-feature data for tier-3
                        for f in set(base_feats) | set(mut_feats):
                            if base_feats.get(f, 0) != mut_feats.get(f, 0):
                                ev.feat_delta_gains.setdefault(f, []).append(gain)
                except Exception:
                    pass
                finally:
                    if mut_tmp:
                        try: os.unlink(mut_tmp)
                        except: pass

        if applied_here > 0:
            ev.files_applied += 1

    ev.crash_rate = ev.total_crashes / ev.total_applied if ev.total_applied else 0.0
    ev.feat_inject_score = sum(all_fis) / len(all_fis) if all_fis else 0.0

    if all_gains:
        ev.mean_gain = sum(all_gains) / len(all_gains)
        if len(all_gains) >= 2 and ev.mean_gain != 0:
            std = statistics.stdev(all_gains)
            ev.gain_consistency = max(0.0, 1.0 - abs(std / ev.mean_gain))
        else:
            ev.gain_consistency = 0.5
    else:
        ev.mean_gain = 0.0
        ev.gain_consistency = 0.0

    ev.applicability = ev.files_applied / ev.files_tried if ev.files_tried else 0.0

    norm_gain = max(0.0, min(1.0, ev.mean_gain + 0.5))
    ev.final_score = (
        W_CRASH_RATE  * ev.crash_rate        +
        W_FEAT_INJECT * ev.feat_inject_score  +
        W_MEAN_GAIN   * norm_gain             +
        W_CONSISTENCY * ev.gain_consistency   +
        W_APPLY       * ev.applicability
    )
    return ev


# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
# MAIN
# PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

def rank_templates(
    templates_file: Path,
    corpus_dir: Path,
    output_file: Path,
    num_files: int = 10,
    mutations_per_file: int = 3,
    min_gain: float = 0.0,
    num_workers: Optional[int] = None,
    run_d8: bool = True,
    run_scorer: bool = True,
    seed: int = 42,
    verbose: bool = False,
) -> None:
    random.seed(seed)

    print(f"[+] Loading templates from {templates_file}")
    with open(templates_file) as f:
        templates = json.load(f)
    filtered = [t for t in templates if t.get("gain", 0.0) >= min_gain]
    print(f"[+] {len(filtered)}/{len(templates)} templates pass min_gain={min_gain}")
    if not filtered:
        print("[!] No templates to rank.")
        return

    all_js = list(corpus_dir.rglob("*.js"))
    if not all_js:
        print(f"[!] No .js files in {corpus_dir}")
        return
    chosen = random.sample(all_js, min(num_files, len(all_js)))
    file_paths = [str(p) for p in chosen]
    print(f"[+] Using {len(chosen)} corpus files")

    #    feature importance                                                   
    importance: Dict[str, float] = {}
    importance_source = "none"

    if run_scorer:
        print("[+] Attempting Tier 1: load model directly...")
        tier1 = try_load_importance_from_model()
        if tier1:
            importance = tier1
            importance_source = "model_file"
        else:
            print("    Not found. Attempting Tier 2: API perturbation...")
            feature_names = _get_feature_names_from_extractor("let x = 1;")
            if feature_names:
                try:
                    importance = compute_perturbation_importance(feature_names)
                    importance_source = "perturbation"
                except Exception as e:
                    print(f"    Tier 2 failed: {e}")

            if not importance:
                print("    Tier 2 unavailable. Tier 3 (empirical) computed during evaluation.")
                importance_source = "empirical_pending"
    else:
        print("[!] Scorer disabled  FIS will be 0 for all templates")

    if importance and importance_source != "empirical_pending":
        top = sorted(importance.items(), key=lambda x: x[1], reverse=True)[:15]
        print(f"\n[+] Top 15 features by importance ({importance_source}):")
        for name, imp in top:
            print(f"    {name:<50} {imp:.4f}")
        print()

    #    evaluate                                                             
    n_workers = num_workers if num_workers is not None else max(1, cpu_count() - 1)
    print(f"[+] Workers={n_workers}  d8={run_d8}  scorer={run_scorer}  importance={importance_source}")

    eval_args = [
        (idx, t, file_paths, mutations_per_file,
         importance, run_d8, run_scorer, seed + idx)
        for idx, t in enumerate(filtered)
    ]

    t0 = time.time()
    evals: List[TemplateEval] = []

    if n_workers > 1:
        with Pool(n_workers) as pool:
            for i, ev in enumerate(pool.imap_unordered(_evaluate_one_template, eval_args), 1):
                evals.append(ev)
                if verbose or i % max(1, len(filtered) // 10) == 0:
                    print(f"  [{i:4d}/{len(filtered)}] idx={ev.template_idx:4d}  "
                          f"score={ev.final_score:.4f}  crashes={ev.total_crashes}  "
                          f"applied={ev.total_applied}  fis={ev.feat_inject_score:.3f}")
    else:
        for i, args in enumerate(eval_args, 1):
            ev = _evaluate_one_template(args)
            evals.append(ev)
            if verbose or i % max(1, len(filtered) // 10) == 0:
                print(f"  [{i:4d}/{len(filtered)}] idx={ev.template_idx:4d}  "
                      f"score={ev.final_score:.4f}  crashes={ev.total_crashes}  "
                      f"applied={ev.total_applied}  fis={ev.feat_inject_score:.3f}")

    elapsed = time.time() - t0

    if importance_source == "empirical_pending":
        print("[+] Finalizing Tier 3 empirical feature importance...")
        empirical_raw: Dict[str, List[float]] = {}
        for ev in evals:
            for f, gains in ev.feat_delta_gains.items():
                empirical_raw.setdefault(f, []).extend(gains)
        importance = finalize_empirical_importance(empirical_raw)
        importance_source = "empirical"
        if importance:
            top = sorted(importance.items(), key=lambda x: x[1], reverse=True)[:15]
            print(f"\n[+] Top 15 features (empirical):")
            for name, imp in top:
                print(f"    {name:<50} {imp:.4f}")
            print()
        # Recompute scores with empirical importance
        for ev in evals:
            scores = []
            for f, gains in ev.feat_delta_gains.items():
                imp = importance.get(f, 0.0)
                if imp > 0:
                    scores.append(imp * max(0.0, sum(gains) / len(gains)))
            ev.feat_inject_score = min(1.0, sum(scores)) if scores else 0.0
            norm_gain = max(0.0, min(1.0, ev.mean_gain + 0.5))
            ev.final_score = (
                W_CRASH_RATE  * ev.crash_rate        +
                W_FEAT_INJECT * ev.feat_inject_score  +
                W_MEAN_GAIN   * norm_gain             +
                W_CONSISTENCY * ev.gain_consistency   +
                W_APPLY       * ev.applicability
            )

    ranked_evals = sorted(evals, key=lambda e: e.final_score, reverse=True)

    #    output  verbatim templates + rank + evaluation                       
    ranked_templates = []
    for rank, ev in enumerate(ranked_evals, 1):
        out = filtered[ev.template_idx].copy()   # verbatim copy, no fields changed
        out["rank"] = rank
        out["evaluation"] = {
            "final_score":              round(ev.final_score, 6),
            "crash_rate":               round(ev.crash_rate, 6),
            "feature_injection_score":  round(ev.feat_inject_score, 6),
            "mean_predicted_gain":      round(ev.mean_gain, 6),
            "gain_consistency":         round(ev.gain_consistency, 6),
            "applicability":            round(ev.applicability, 6),
            "crashes_found":            ev.total_crashes,
            "mutations_applied":        ev.total_applied,
            "files_tried":              ev.files_tried,
            "files_applied":            ev.files_applied,
            "importance_source":        importance_source,
            "weights": {
                "crash_rate":    W_CRASH_RATE,
                "feat_inject":   W_FEAT_INJECT,
                "mean_gain":     W_MEAN_GAIN,
                "consistency":   W_CONSISTENCY,
                "applicability": W_APPLY,
            },
        }
        ranked_templates.append(out)

    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(ranked_templates, f, indent=2)
    print(f"[+] Ranked templates -> {output_file}")

    total_crashes = sum(ev.total_crashes for ev in evals)
    total_applied = sum(ev.total_applied for ev in evals)
    stats_path = output_file.parent / (output_file.stem + "_stats.json")
    stats = {
        "evaluation_summary": {
            "templates_ranked":   len(ranked_templates),
            "corpus_files":       len(chosen),
            "mutations_per_file": mutations_per_file,
            "total_applied":      total_applied,
            "total_crashes":      total_crashes,
            "overall_crash_rate": round(total_crashes / total_applied, 4) if total_applied else 0,
            "elapsed_seconds":    round(elapsed, 1),
            "importance_source":  importance_source,
        },
        "weights": {"crash_rate": W_CRASH_RATE, "feat_inject": W_FEAT_INJECT,
                    "mean_gain": W_MEAN_GAIN, "consistency": W_CONSISTENCY,
                    "applicability": W_APPLY},
        "top_20": [
            {
                "rank": rank+1, "template_idx": ev.template_idx,
                "final_score": round(ev.final_score, 4),
                "crash_rate": round(ev.crash_rate, 4), "crashes": ev.total_crashes,
                "fis": round(ev.feat_inject_score, 4), "mean_gain": round(ev.mean_gain, 4),
                "consistency": round(ev.gain_consistency, 4), "applied": ev.total_applied,
                "kind": filtered[ev.template_idx].get("kind", ""),
                "node_type": filtered[ev.template_idx].get("node_type", ""),
                "after_preview": " ".join(filtered[ev.template_idx].get("after", []))[:80],
            }
            for rank, ev in enumerate(ranked_evals[:20])
        ],
        "top_important_features": sorted(
            importance.items(), key=lambda x: x[1], reverse=True)[:30] if importance else [],
    }
    with open(stats_path, "w") as f:
        json.dump(stats, f, indent=2)
    print(f"[+] Statistics -> {stats_path}")

    print()
    print("=" * 74)
    print("RANKING SUMMARY")
    print("=" * 74)
    print(f"  Templates  : {len(ranked_templates)}  |  Corpus: {len(chosen)}  |  "
          f"Applied: {total_applied:,}  |  Crashes: {total_crashes}")
    print(f"  Crash rate : {100*total_crashes/max(total_applied,1):.1f}%  |  "
          f"Importance: {importance_source}  |  Time: {elapsed:.1f}s")
    print()
    print(f"  {'Rk':>3}  {'Score':>6}  {'CrshR':>5}  {'FIS':>5}  {'MGain':>6}  "
          f"{'Cons':>5}  {'App':>4}  {'kind':>7}  Preview")
    print("  " + "-" * 70)
    for ev in ranked_evals[:20]:
        t = filtered[ev.template_idx]
        rk = ranked_evals.index(ev) + 1
        preview = " ".join(t.get("after", []))[:35]
        print(f"  {rk:>3}  {ev.final_score:6.4f}  {ev.crash_rate:5.3f}  "
              f"{ev.feat_inject_score:5.3f}  {ev.mean_gain:6.3f}  "
              f"{ev.gain_consistency:5.3f}  {ev.applicability:4.2f}  "
              f"{t.get('kind','?'):>7}  {preview}")
    print("=" * 74)


def main():
    ap = argparse.ArgumentParser(
        description="Rank mutation templates by crash-discovery potential using model feature importance"
    )
    ap.add_argument("--templates",           required=True)
    ap.add_argument("--corpus",              required=True)
    ap.add_argument("--output",              required=True)
    ap.add_argument("--num-files",           type=int, default=10)
    ap.add_argument("--mutations-per-file",  type=int, default=3)
    ap.add_argument("--min-gain",            type=float, default=0.0)
    ap.add_argument("--workers",             type=int, default=None)
    ap.add_argument("--no-d8",               action="store_true")
    ap.add_argument("--no-scorer",           action="store_true")
    ap.add_argument("--seed",                type=int, default=42)
    ap.add_argument("--verbose",             action="store_true")
    args = ap.parse_args()

    rank_templates(
        templates_file=Path(args.templates),
        corpus_dir=Path(args.corpus),
        output_file=Path(args.output),
        num_files=args.num_files,
        mutations_per_file=args.mutations_per_file,
        min_gain=args.min_gain,
        num_workers=args.workers,
        run_d8=not args.no_d8,
        run_scorer=not args.no_scorer,
        seed=args.seed,
        verbose=args.verbose,
    )


if __name__ == "__main__":
    main()