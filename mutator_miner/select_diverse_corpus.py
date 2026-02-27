#!/usr/bin/env python3
"""
select_diverse_corpus.py

Extract features from all corpus JS files, cluster by feature vector,
pick one file per cluster (nearest to centroid), validate with d8.

Validation rules (same as rank_mutators_v2.py):
  exit 0  → clean run        → KEEP
  exit 1  → JS runtime error → REJECT  (uninteresting — mutation already broke it)
  exit >1 → engine crash     → KEEP    (already interesting seed)
  timeout → hangs            → REJECT  (would stall workers)

Output:
  diverse_corpus.json       — plain list of N paths (consumed by rank_mutators_v2.py)
  diverse_corpus_meta.json  — full metadata per selected file

Usage:
    python3 select_diverse_corpus.py \\
        --corpus corpus/ \\
        --n-clusters 20 \\
        --output diverse_corpus.json \\
        --workers 16

    # Then in rank_mutators_v2.py replace:
    #   chosen = random.sample(all_js, ...)
    # with:
    #   file_paths = json.load(open('diverse_corpus.json'))
"""

import os, sys, json, subprocess, time, argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from multiprocessing import Pool, cpu_count

import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer

# ── configuration ─────────────────────────────────────────────────────────────
JS_ENGINE_PATH = os.environ.get(
    "JS_ENGINE_PATH",
    "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8",
)
JS_ENGINE_ARGS  = ["--allow-natives-syntax", "--expose-gc"]
FEATURE_CMD     = ["python3.13", "../feature_extractor_cli.py",
                   "file", "--i", None, "--format", "string"]
D8_TIMEOUT      = 3.0    # tight — we don't want hangers blocking workers
FEATURE_TIMEOUT = 20.0


# ══════════════════════════════════════════════════════════════════════════════
# FEATURE EXTRACTION
# ══════════════════════════════════════════════════════════════════════════════

def _parse_feature_string(raw: str) -> Dict[str, float]:
    d: Dict[str, float] = {}
    for pair in raw.split(","):
        if "=" not in pair:
            continue
        k, v = pair.split("=", 1)
        key = k.strip()
        try:
            val = eval(v.strip(), {"__builtins__": {}})
            if isinstance(val, bool):
                d[key] = 1.0 if val else 0.0
            elif isinstance(val, (int, float)):
                d[key] = float(val)
            else:
                d[key] = float("nan")
        except Exception:
            d[key] = float("nan")
    return d


def extract_features_for_file(path_str: str) -> Tuple[str, Optional[Dict[str, float]]]:
    """Worker: extract features for one file. Returns (path, feats_or_None)."""
    cmd = FEATURE_CMD.copy()
    cmd[4] = path_str
    try:
        r = subprocess.run(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            text=True, timeout=FEATURE_TIMEOUT,
        )
        raw = r.stdout.strip()
        if not raw:
            return path_str, None
        feats = _parse_feature_string(raw)
        return (path_str, feats) if feats else (path_str, None)
    except Exception:
        return path_str, None


# ══════════════════════════════════════════════════════════════════════════════
# D8 VALIDATION
# ══════════════════════════════════════════════════════════════════════════════

def d8_classify(path_str: str) -> Tuple[str, str]:
    """
    Worker: run file through d8, return (path, classification).

    Classification:
      keep_clean   — exit 0:    normal execution, valid seed
      keep_crash   — exit >1:   engine crash/assert, already interesting seed
      reject_error — exit 1:    JS-level error (TypeError/SyntaxError etc.)
                                Mutations on a broken file produce noisy signal.
      reject_timeout — timeout: file hangs, would stall ranking workers
    """
    try:
        p = subprocess.run(
            [JS_ENGINE_PATH, path_str] + JS_ENGINE_ARGS,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=D8_TIMEOUT,
        )
        if p.returncode == 0:
            return path_str, "keep_clean"
        elif p.returncode == 1:
            return path_str, "reject_error"
        else:
            return path_str, "keep_crash"
    except subprocess.TimeoutExpired:
        return path_str, "reject_timeout"
    except Exception:
        return path_str, "reject_error"


# ══════════════════════════════════════════════════════════════════════════════
# CLUSTERING
# ══════════════════════════════════════════════════════════════════════════════

def build_feature_matrix(
    feats_map: Dict[str, Dict[str, float]],
    all_keys: List[str],
) -> Tuple[np.ndarray, List[str]]:
    paths = list(feats_map.keys())
    matrix = np.zeros((len(paths), len(all_keys)), dtype=np.float32)
    for i, path in enumerate(paths):
        fd = feats_map[path]
        for j, key in enumerate(all_keys):
            v = fd.get(key, 0.0)
            matrix[i, j] = v if np.isfinite(v) else 0.0
    return matrix, paths


def fit_transform_pipeline(matrix: np.ndarray, seed: int) -> np.ndarray:
    """Impute → StandardScale → PCA (if high-dimensional). Returns scaled matrix."""
    imputer = SimpleImputer(strategy="constant", fill_value=0.0)
    mat = imputer.fit_transform(matrix)

    scaler = StandardScaler()
    mat = scaler.fit_transform(mat)

    # PCA to reduce noise: keep up to 50 components
    if mat.shape[1] > 50:
        n_comp = min(50, mat.shape[0] - 1, mat.shape[1])
        pca = PCA(n_components=n_comp, random_state=seed)
        mat = pca.fit_transform(mat)
        explained = pca.explained_variance_ratio_.sum()
        print(f"    PCA: {n_comp} components, {explained:.1%} variance explained")

    return mat


def cluster_and_rank_members(
    scaled: np.ndarray,
    paths: List[str],
    n_clusters: int,
    seed: int,
) -> Tuple[KMeans, np.ndarray, Dict[int, List[Tuple[str, float]]]]:
    """
    K-means cluster the scaled matrix.
    Returns (km_model, labels, {cluster_id: [(path, dist_to_centroid), ...]}).
    Each cluster list is sorted nearest-first.
    """
    n_actual = min(n_clusters, len(paths))
    print(f"    K-means: {n_actual} clusters on {len(paths)} files "
          f"({scaled.shape[1]} features after PCA)...")

    km = KMeans(n_clusters=n_actual, random_state=seed, n_init=10, max_iter=300)
    labels = km.fit_predict(scaled)
    centroids = km.cluster_centers_

    cluster_members: Dict[int, List[Tuple[str, float]]] = {}
    for cid in range(n_actual):
        mask = labels == cid
        if not mask.any():
            continue
        idx   = np.where(mask)[0]
        pts   = scaled[idx]
        dists = np.linalg.norm(pts - centroids[cid], axis=1)
        order = np.argsort(dists)
        cluster_members[cid] = [(paths[idx[o]], float(dists[o])) for o in order]

    return km, labels, cluster_members


# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

def main():
    ap = argparse.ArgumentParser(
        description="Select diverse corpus seeds via feature clustering + d8 validation"
    )
    ap.add_argument("--corpus",      required=True,
                    help="Directory with .js corpus files")
    ap.add_argument("--n-clusters",  type=int, default=20,
                    help="Number of diverse seeds to select (default 20)")
    ap.add_argument("--output",      required=True,
                    help="Output JSON path  e.g. diverse_corpus.json")
    ap.add_argument("--workers",     type=int, default=None,
                    help="Parallel workers (default: CPU count - 1)")
    ap.add_argument("--seed",        type=int, default=42)
    ap.add_argument("--cache",       default="corpus_features_cache.json",
                    help="Feature cache file (re-used on subsequent runs)")
    ap.add_argument("--no-cache",    action="store_true",
                    help="Ignore existing cache and re-extract all features")
    ap.add_argument("--max-fallback", type=int, default=10,
                    help="How many next-nearest cluster members to try if centroid "
                         "is rejected by d8 (default 10)")
    args = ap.parse_args()

    corpus_dir  = Path(args.corpus)
    output_path = Path(args.output)
    n_workers   = args.workers or max(1, cpu_count() - 1)

    # ── find JS files ─────────────────────────────────────────────────────────
    all_js = sorted(corpus_dir.rglob("*.js"))
    if not all_js:
        print(f"[!] No .js files in {corpus_dir}")
        sys.exit(1)
    print(f"[+] Found {len(all_js)} .js files")

    # ── feature extraction with caching ──────────────────────────────────────
    feats_map: Dict[str, Dict[str, float]] = {}
    cache_path = Path(args.cache)

    if not args.no_cache and cache_path.exists():
        try:
            cached = json.load(open(cache_path))
            feats_map = {k: v for k, v in cached.items()
                         if Path(k).exists() and v is not None}
            print(f"[+] Loaded {len(feats_map)} cached feature vectors from {cache_path}")
        except Exception as e:
            print(f"[!] Cache read failed ({e}), re-extracting")

    to_extract = [str(p) for p in all_js if str(p) not in feats_map]

    if to_extract:
        print(f"[+] Extracting features: {len(to_extract)} files, {n_workers} workers...")
        t0 = time.time()
        with Pool(n_workers) as pool:
            results = pool.map(extract_features_for_file, to_extract)
        elapsed = time.time() - t0

        ok = 0
        for path_str, feats in results:
            if feats:
                feats_map[path_str] = feats
                ok += 1
            else:
                print(f"  [!] Failed: {Path(path_str).name}")
        print(f"    {ok}/{len(to_extract)} succeeded in {elapsed:.1f}s")

        try:
            with open(cache_path, "w") as f:
                json.dump(feats_map, f)
            print(f"[+] Feature cache saved → {cache_path}")
        except Exception as e:
            print(f"[!] Cache save failed: {e}")

    if not feats_map:
        print("[!] No feature vectors — cannot cluster")
        sys.exit(1)

    # ── build feature matrix ──────────────────────────────────────────────────
    all_keys = sorted({k for fd in feats_map.values() for k in fd})
    print(f"[+] Feature space: {len(all_keys)} features, {len(feats_map)} files")

    matrix, paths = build_feature_matrix(feats_map, all_keys)

    # ── cluster ───────────────────────────────────────────────────────────────
    print(f"[+] Clustering into {args.n_clusters} groups...")
    scaled = fit_transform_pipeline(matrix, args.seed)
    _, _, cluster_members = cluster_and_rank_members(
        scaled, paths, args.n_clusters, args.seed
    )

    # ── collect top-N candidates per cluster for validation ───────────────────
    # Validate the nearest `max_fallback` files per cluster up-front in parallel
    # so we only need one pool.map call instead of one per cluster.
    candidates_to_validate: List[str] = []
    for members in cluster_members.values():
        for path, _ in members[:args.max_fallback]:
            if path not in candidates_to_validate:
                candidates_to_validate.append(path)

    print(f"[+] Validating {len(candidates_to_validate)} candidates with d8 "
          f"({n_workers} workers)...")
    t0 = time.time()
    with Pool(n_workers) as pool:
        val_raw = pool.map(d8_classify, candidates_to_validate)
    val_results: Dict[str, str] = dict(val_raw)
    elapsed = time.time() - t0
    print(f"    Done in {elapsed:.1f}s")

    # Summarise validation
    from collections import Counter
    counts = Counter(val_results.values())
    for status, n in sorted(counts.items()):
        print(f"    {status:<20} {n}")

    # ── select best valid file per cluster ────────────────────────────────────
    KEEP = {"keep_clean", "keep_crash"}
    final_selected: List[Dict] = []

    for cid, members in sorted(cluster_members.items()):
        chosen_path   = None
        chosen_status = None
        chosen_dist   = 0.0
        fallback_rank = 0

        for path, dist in members[:args.max_fallback]:
            status = val_results.get(path, "reject_error")
            if status in KEEP:
                chosen_path   = path
                chosen_status = status
                chosen_dist   = dist
                break
            fallback_rank += 1

        if chosen_path is None:
            print(f"  [!] Cluster {cid:2d}: all {args.max_fallback} candidates "
                  f"rejected — skipping cluster")
            continue

        crash_marker = "  ← CRASHES ENGINE" if chosen_status == "keep_crash" else ""
        fb_note      = f" (fallback #{fallback_rank})" if fallback_rank else ""
        print(f"  Cluster {cid:2d}: {Path(chosen_path).name:<40} "
              f"[{chosen_status}]  dist={chosen_dist:.3f}{fb_note}{crash_marker}")

        final_selected.append({
            "cluster":          cid,
            "path":             chosen_path,
            "d8_status":        chosen_status,
            "dist_to_centroid": round(chosen_dist, 4),
            "fallback_rank":    fallback_rank,
        })

    if not final_selected:
        print("[!] No valid files selected — all clusters rejected")
        sys.exit(1)

    # ── write outputs ─────────────────────────────────────────────────────────
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Plain path list — what rank_mutators_v2.py loads
    path_list = [s["path"] for s in final_selected]
    with open(output_path, "w") as f:
        json.dump(path_list, f, indent=2)

    # Full metadata
    meta_path = output_path.parent / (output_path.stem + "_meta.json")
    with open(meta_path, "w") as f:
        json.dump(final_selected, f, indent=2)

    # ── summary ───────────────────────────────────────────────────────────────
    n_clean   = sum(1 for s in final_selected if s["d8_status"] == "keep_clean")
    n_crash   = sum(1 for s in final_selected if s["d8_status"] == "keep_crash")
    n_skipped = args.n_clusters - len(final_selected)

    print()
    print("=" * 62)
    print("CORPUS SELECTION SUMMARY")
    print("=" * 62)
    print(f"  Input files      : {len(all_js)}")
    print(f"  With features    : {len(feats_map)}")
    print(f"  Clusters         : {len(cluster_members)}")
    print(f"  Selected         : {len(final_selected)}")
    print(f"    clean runs     : {n_clean}")
    print(f"    engine crashes : {n_crash}  (already interesting seeds!)")
    print(f"    clusters skipped: {n_skipped}  (all candidates rejected by d8)")
    print(f"  Output           : {output_path}")
    print(f"  Metadata         : {meta_path}")
    print("=" * 62)
    print()
    print("Integration with rank_mutators_v2.py:")
    print("  Replace the corpus random.sample block with:")
    print(f"    file_paths = json.load(open('{output_path}'))")


if __name__ == "__main__":
    main()