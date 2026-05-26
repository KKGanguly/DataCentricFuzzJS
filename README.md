# From Coverage to Causes: Data-Centric Fuzzing for JavaScript Engines

This repository contains the official artifacts (scripts and data) for the paper **"From Coverage to Causes: Data-Centric Fuzzing for JavaScript Engines"**, a data-centric approach to finding vulnerabilities in the V8 JavaScript engine.

* **Authors:** Kishan Kumar Ganguly, Tim Menzies
* **Contact:** `kgangul@ncsu.edu`, `tjmenzies@ncsu.edu`
* **Artifacts URL:** `https://github.com/anon-artifacts/DataCentricFuzzJS`

## 🚀 Overview

This project challenges traditional coverage-guided fuzzing, which is often inefficient for complex targets like the V8 JavaScript engine. Such fuzzers waste effort on low-risk inputs and can accidentally destroy vulnerability-triggering patterns.

Instead of prioritizing new code paths (asking "is this path new?"), we introduce **feature-guided fuzzing**. Our approach asks, **"does this code look dangerous?"**.

To do this, we use:
1.  **LLM-Boosted Feature Engineering:** We use a Large Language Model (LLM) to analyze historical V8 vulnerabilities and automatically generate a set of static (code-based) and dynamic (runtime-based) features indicative of high-risk inputs.
2.  **Predictive Guidance Model:** We train an **XGBoost** classifier on these features to predict the likelihood that a new input will trigger a vulnerability.
3.  **Feature-Guided Fuzzer:** We built a fuzzer (on top of Fuzzilli) that uses this model's prediction score as its primary guidance, dedicating 90% of its effort to "exploiting" high-risk seeds and 10% to "exploring" new coverage.

Our results show this model is highly precise (over 85% precision) with a very low false alarm rate (under 1%). We also found that only the **top 25%** of features are needed for this performance, making the fuzzer fast and efficient.

## 📊 Datasets

Our evaluation is based on a highly imbalanced dataset mimicking real-world fuzzing scenarios:
* **Positive Samples:** 160 historically verified, vulnerability-triggering Proofs-of-Concept (PoCs) retrieved from the Chromium bug repository.
* **Negative Samples:** 8,498 benign JS code seeds extracted from V8's `mjsunit` regression suite.
* **Features:** A total of 164 features (115 static source-code regex features and 49 dynamic runtime features extracted using just 5 V8 trace flags).

The folds directory contains the datasets divided by time folds. 

## 🛠️ Installation and Setup

### 1. Install Dependencies

First, run the main dependency installation script:

```bash
./install_deps.sh
```

### 2. Install V8 Engine (via `jsvu`)

For most of the predictive modeling and evaluation, you will need a `d8` shell. The easiest way to get a specific V8 version is by using `jsvu`:

```bash
# Install jsvu globally
sudo npm install -g jsvu

# Install the specific V8 version used for experiments
jsvu v8@14.1.146
```

### 3. Build V8 from Source with Fuzzing Flags

To run the full fuzzer (RQ5) and reproduce the instrumented build, you must compile V8 from source using `depot_tools` with specific build flags (e.g., ASAN, coverage).

```bash
# Define environment variables (adjust paths as needed)
# Assumes v8.tar.gz is in the current directory
export DEPS="$HOME/Downloads/depot_tools"
export V8_COMMIT="YOUR_SPECIFIC_V8_COMMIT_HASH" # e.g., from the paper's experiment
export OUTDIR="out/fuzz"
export NINJA_JOBS=16 # Adjust to your core count

# --- 1. Get Depot Tools ---
if [ ! -d "$DEPS" ]; then
  git clone --depth=1 [https://chromium.googlesource.com/chromium/tools/depot_tools](https://chromium.googlesource.com/chromium/tools/depot_tools) "$DEPS"
else
  echo "depot_tools already exists at $DEPS"
fi

# --- 2. Add to PATH ---
export PATH="$DEPS:$PATH"
if ! grep -Fxq 'export PATH="$HOME/Downloads/depot_tools":$PATH' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/Downloads/depot_tools":$PATH' >> "$HOME/.bashrc"
  echo "Appended depot_tools PATH to ~/.bashrc"
else
  echo "depot_tools PATH already in ~/.bashrc"
fi

# --- 3. Fetch and Build V8 ---
if [ ! -d "v8" ]; then
  tar -zxvf v8.tar.gz || true
else
  echo "v8 directory already exists, skipping fetch"
fi

# Enter V8 directory and build
cd v8 && \
git checkout "$V8_COMMIT" || true && \
gclient sync --with_branch_heads --with_tags || true && \
gn gen "$OUTDIR" --args='is_debug=false is_asan=true dcheck_always_on=true v8_static_library=true v8_enable_verify_heap=true v8_fuzzilli=true sanitizer_coverage_flags="trace-pc-guard" target_cpu="x64"' && \
ninja -j"$NINJA_JOBS" -C "$OUTDDIR" d8
```

## ⚙️ Configuration

### Set V8 Version in Scripts

Before running the evaluation scripts, you must ensure the dynamic feature extractor points to the correct V8 `d8` binary that you installed.

  * **File to Edit:** `dynamic_feature_extractor_v2.py`
  * **Action:** Open this file and update the variable holding the V8 version/path to match the one you installed (e.g., `v8@14.1.146`).

## 🔬 Reproducing the Paper's Results

The following scripts reproduce the key Research Questions (RQs) from the paper.

### RQ2 & RQ4 (Predictive Performance & Minimal Feature Set)

To evaluate the predictive performance (precision, recall, false alarm) of the guidance model using the time-aware cross-validation setup, run:

```bash
python3.13 prediction_time_aware.py
```

This script also provides the data for analyzing the minimal feature set (RQ4).

### RQ3 (Ablation Study: Static vs. Dynamic Features)

To run the ablation study that compares the performance of the static-only, dynamic-only, and combined feature models, run:

```bash
python3.13 prediction_compare_time_aware.py > compare.txt
```

### RQ5, RQ6 & RQ7 (Feature-Guided Fuzzing)

Running the full feature-guided fuzzer is a multi-step process. It requires populating the database, launching the prediction services, and then starting the fuzzer. The fuzzer outputs stats such as execution time, crashes etc. which are used to answer these research questions.

**1. Populate the Database**

Load the corpus (vulnerable PoCs and benign mjsunit tests) into the database.

```bash
# Load vulnerable PoCs
./load_corpus.sh corpus_pocs loaded_corpus 10 16

# Load benign test cases from mjsunit
./load_corpus.sh corpus_mjsunit loaded_corpus 10 16
```

**2. Run Prediction Services**

These services provide the model's predictions to the fuzzer in real-time. **Run each command in a separate terminal.**

```bash
# Terminal 1: SHAP service for feature importance
python3.13 predict_minimal_shap.py
```

```bash
# Terminal 2: Main crash prediction service
python3.13 crash_predictor_service.py
```

**3. Run the Fuzzer**

With both services running, you can launch the fuzzer:

```bash
./run.sh loaded_corpus
```

The fuzzer will now communicate with the services to score and prioritize seeds based on their predicted risk.

## License and Attribution

This project includes modifications to [Fuzzilli](https://github.com/googleprojectzero/fuzzilli), 
which is licensed under the Apache License 2.0. 

All modifications in this repository © 2025 Kishan Kumar Ganguly. 
This repository remains licensed under the Apache License 2.0. 
See the original LICENSE file for details.


## 📜 Citation

If you use this work, please cite the original paper:

```bibtex
@article{Ganguly2025DataCentricFuzzJS,
  title   = {From Coverage to Causes: Data-Centric Fuzzing for JavaScript Engines},
  author  = {Kishan Kumar Ganguly and Tim Menzies},
  journal = {Preprint submitted to Information and Software Technology},
  year    = {2025},
  month   = {Oct},
  note    = {Available at \url{[https://github.com/anon-artifacts/DataCentricFuzzJS](https://github.com/anon-artifacts/DataCentricFuzzJS)}}
}
```
