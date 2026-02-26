#!/usr/bin/env python3
"""
Diagnostic script — runs each stage of the mutator learning pipeline
on a single file with full verbose output so we can see exactly where
things fail.
"""
import os, sys, json, subprocess, tempfile, requests, re, random

# ── config matching your actual setup ───────────────────────────────────────
CORPUS = "corpus"
PREDICT_URL = "http://localhost:5000/predict"
FEATURE_CMD = ["python3.13", "../feature_extractor_cli.py", "file", "--i", None, "--format", "string"]
JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8")
JS_ENGINE_EXEC_ARGS = ["--allow-natives-syntax", "--expose-gc"]
GUMTREE_BIN = os.environ.get("GUMTREE", "gumtree")

# ── helpers ──────────────────────────────────────────────────────────────────
def sep(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print('='*60)

def ok(msg):  print(f"  [OK]  {msg}")
def err(msg): print(f"  [ERR] {msg}")
def info(msg):print(f"  [..] {msg}")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 0: Environment checks")

# Check JS engine
try:
    r = subprocess.run([JS_ENGINE_PATH, "--version"],
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5)
    out = (r.stdout + r.stderr).decode(errors="ignore").strip()
    ok(f"d8 found: {JS_ENGINE_PATH}")
    info(f"  version output: {out[:80]}")
except FileNotFoundError:
    err(f"d8 NOT FOUND at {JS_ENGINE_PATH}")
except Exception as e:
    err(f"d8 error: {e}")

# Check GumTree
try:
    r = subprocess.run([GUMTREE_BIN, "--version"],
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5)
    out = (r.stdout + r.stderr).decode(errors="ignore").strip()
    ok(f"GumTree found: {GUMTREE_BIN}")
    info(f"  version output: {out[:80]}")
except FileNotFoundError:
    err(f"GumTree NOT FOUND at {GUMTREE_BIN}")
    err("  → All GumTree diffs will return None → 0 templates always")
except Exception as e:
    err(f"GumTree error: {e}")

# Check scorer endpoint
try:
    r = requests.post(PREDICT_URL, json={"test": 1}, timeout=5)
    ok(f"Scorer reachable at {PREDICT_URL}")
    info(f"  response: {r.text[:100]}")
except requests.exceptions.ConnectionError:
    err(f"Scorer NOT reachable at {PREDICT_URL}")
    err("  → crash_score() always returns 0.0 → gain always 0 → 0 mutations saved")
except Exception as e:
    err(f"Scorer error: {e}")

# Check feature extractor
try:
    tmp = tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False)
    tmp.write("let x = 1;")
    tmp.close()
    cmd = FEATURE_CMD.copy(); cmd[4] = tmp.name
    r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=10)
    out = r.stdout.decode(errors="ignore").strip()
    os.unlink(tmp.name)
    if r.returncode == 0 and out:
        ok(f"Feature extractor works")
        info(f"  sample output: {out[:120]}")
    else:
        err(f"Feature extractor failed (rc={r.returncode})")
        err(f"  stdout: {out[:200]}")
        err(f"  stderr: {r.stderr.decode(errors='ignore')[:200]}")
        err("  → extract_features() always returns {} → crash_score()=0 → 0 mutations")
except FileNotFoundError as e:
    err(f"Feature extractor not found: {e}")
    err("  → extract_features() always returns {} → crash_score()=0 → 0 mutations")
except Exception as e:
    err(f"Feature extractor exception: {e}")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 1: Corpus check")

if not os.path.isdir(CORPUS):
    err(f"Corpus dir '{CORPUS}' not found — run from correct directory")
    sys.exit(1)

files = [f for f in os.listdir(CORPUS) if f.endswith(".js")]
info(f"Found {len(files)} .js files in {CORPUS}/")
if not files:
    err("No JS files in corpus — nothing to process")
    sys.exit(1)

# Pick the first corpus file for detailed tracing
fname = files[0]
path = os.path.join(CORPUS, fname)
src = open(path, errors="ignore").read()
ok(f"Using: {fname} ({len(src)} bytes)")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 2: v8_parse_ok on corpus file")

def v8_parse_ok(js, timeout=5.0):
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(js)
            tmp_path = f.name
        p = subprocess.run([JS_ENGINE_PATH, tmp_path] + JS_ENGINE_EXEC_ARGS,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=timeout)
        ret = p.returncode
        return (True, ret)
    except subprocess.TimeoutExpired:
        return (True, "timeout")
    except Exception as ex:
        return (True, f"exception:{ex}")
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try: os.remove(tmp_path)
            except: pass

ok_flag, rc = v8_parse_ok(src)
if ok_flag:
    ok(f"v8_parse_ok=True (exit code={rc})")
else:
    err(f"v8_parse_ok=False (exit code={rc}) — file will be SKIPPED entirely")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 3: Feature extraction + baseline score")

def extract_features(jsfile):
    cmd = FEATURE_CMD.copy(); cmd[4] = jsfile
    try:
        r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=20)
        raw = r.stdout.strip()
        if not raw:
            return {}
        d = {}
        for pair in raw.split(","):
            if "=" not in pair: continue
            k, v = pair.split("=", 1)
            try: d[k.strip()] = eval(v.strip(), {"__builtins__":{}})
            except: d[k.strip()] = v.strip()
        return d
    except Exception as e:
        return {}

def crash_score(feats):
    try:
        r = requests.post(PREDICT_URL, json=feats, timeout=10)
        return float(r.json().get("probability", 0.0))
    except:
        return 0.0

base_feats = extract_features(path)
info(f"Feature dict has {len(base_feats)} keys")
if not base_feats:
    err("extract_features returned empty dict — scorer will get nothing useful")
else:
    sample = dict(list(base_feats.items())[:5])
    info(f"  sample features: {sample}")

base_score = crash_score(base_feats)
info(f"Baseline crash_score = {base_score:.6f}")
if base_score == 0.0:
    err("Baseline score is 0.0 — if ALL mutations also score 0.0,")
    err("  the gain threshold (>0.05) will NEVER be met → 0 mutations saved")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 4: Fragment pool + mutation")

sys.path.insert(0, ".")
try:
    from corpus_ast_mutator import build_pool, mutate
    pool = build_pool(CORPUS)
    info(f"Pool: {len(pool.statements)} simple, {len(pool.compound)} compound, "
         f"{len(pool.expressions)} exprs")
    if not pool.statements and not pool.compound:
        err("Pool is empty — no mutations possible")
except Exception as e:
    err(f"Failed to import/build pool: {e}")
    sys.exit(1)

# Try 5 mutations and check scores
N_TRY = 5
info(f"\nTrying {N_TRY} mutations on {fname}...")
successful_mutations = []
for i in range(N_TRY):
    try:
        mutated = mutate(src, pool, rounds=3)
        ok_flag, rc = v8_parse_ok(mutated)
        if not ok_flag:
            info(f"  mut {i+1}: v8_parse_ok=False (rc={rc}) — skipped")
            continue

        with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
            f.write(mutated)
            tmp_path = f.name
        try:
            new_feats = extract_features(tmp_path)
            new_score = crash_score(new_feats)
            gain = new_score - base_score
            changed = mutated != src
            info(f"  mut {i+1}: changed={changed} score={new_score:.6f} gain={gain:+.6f} "
                 f"feats={len(new_feats)}")
            if gain > 0.05:
                ok(f"  mut {i+1}: PASSES THRESHOLD (gain={gain:.4f})")
                successful_mutations.append((mutated, gain))
            elif gain <= 0.05 and new_score > 0:
                info(f"  mut {i+1}: score > 0 but gain too small ({gain:.6f} ≤ 0.05)")
        finally:
            os.unlink(tmp_path)
    except Exception as e:
        err(f"  mut {i+1}: exception: {e}")

if not successful_mutations:
    err(f"\nNo mutations passed gain threshold after {N_TRY} tries")
    if base_score == 0.0:
        err("  Most likely cause: scorer unreachable or feature extractor broken")
        err("  Both base_score and new_score are 0.0, so gain=0 always")

# ════════════════════════════════════════════════════════════════════════════
sep("STAGE 5: GumTree diff test")

if successful_mutations:
    mutated, gain = successful_mutations[0]
else:
    # Force a diff test with the original vs itself to check GumTree works at all
    info("No passing mutations — testing GumTree with trivial diff anyway")
    mutated = src + "\n// added"
    gain = 0.1

orig_tmp = mutated_tmp = None
try:
    with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
        f.write(src); orig_tmp = f.name
    with tempfile.NamedTemporaryFile(suffix=".js", mode="w", delete=False) as f:
        f.write(mutated); mutated_tmp = f.name

    cmd = [GUMTREE_BIN, "textdiff", orig_tmp, mutated_tmp, "-f", "JSON"]
    info(f"Running: {' '.join(cmd)}")
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
    raw = (p.stdout or b"").decode(errors="ignore").strip()
    stderr_out = (p.stderr or b"").decode(errors="ignore").strip()

    info(f"  GumTree rc={p.returncode}")
    info(f"  stdout len={len(raw)} bytes")
    if stderr_out:
        info(f"  stderr: {stderr_out[:200]}")

    if not raw:
        err("GumTree returned empty stdout — JSON parse will fail → 0 templates")
        err("  Possible causes:")
        err("    - GumTree can't parse JS (wrong parser plugin?)")
        err("    - GumTree binary is there but not functional")
        err("    - Need 'gumtree-js' parser plugin on classpath")
    else:
        try:
            gj = json.loads(raw)
            ops = gj.get("operations") or gj.get("actions") or []
            ok(f"GumTree JSON parsed OK — {len(ops)} operations")
            if ops:
                info(f"  First op: {json.dumps(ops[0])[:200]}")
            else:
                err("GumTree returned 0 operations — no diff detected")
                err("  Raw JSON keys: " + str(list(gj.keys())))
                info(f"  Raw (first 500 chars): {raw[:500]}")
        except json.JSONDecodeError as e:
            err(f"JSON parse error: {e}")
            info(f"  Raw output (first 500 chars): {raw[:500]}")
finally:
    for p_ in (orig_tmp, mutated_tmp):
        if p_ and os.path.exists(p_):
            try: os.remove(p_)
            except: pass

# ════════════════════════════════════════════════════════════════════════════
sep("SUMMARY")
print("""
Check the [ERR] lines above. The most common causes of 0 saved mutators are:

  1. Scorer unreachable (http://localhost:5000/predict)
     → base_score=0, new_score=0, gain=0 always → threshold never met

  2. Feature extractor broken/wrong path
     → empty feature dict → scorer gets nothing → score=0

  3. GumTree not installed or wrong binary/parser
     → run_gumtree_diff returns None → 0 templates extracted

  4. Corpus files all fail v8_parse_ok
     → every file returned early before any mutation

  5. Gain threshold 0.05 too high relative to actual score range
     → raise it, or check what score range your scorer actually returns
""")