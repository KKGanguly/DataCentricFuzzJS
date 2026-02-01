# Define environment variables (adjust paths as needed)
# Assumes v8.tar.gz is in the current directory
export DEPS="$HOME/Downloads/depot_tools"
export V8_COMMIT="fed47445bbdd1a69b70f2b93a761c62c1e0f769c" # e.g., from the paper's experiment
export OUTDIR="out/fuzz"
export NINJA_JOBS=16 # Adjust to your core count

# --- 1. Get Depot Tools ---
if [ ! -d "$DEPS" ]; then
  git clone --depth=1 https://chromium.googlesource.com/chromium/tools/depot_tools "$DEPS"
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
  fetch v8 || true
else
  echo "v8 directory already exists, skipping fetch"
fi

# Enter V8 directory and build
cd v8 && \
git checkout "$V8_COMMIT" || true && \
gclient sync --with_branch_heads --with_tags || true && \
gn gen "$OUTDIR" --args='is_debug=false is_asan=true dcheck_always_on=true v8_static_library=true v8_enable_verify_heap=true v8_fuzzilli=true sanitizer_coverage_flags="trace-pc-guard" target_cpu="x64"' && \
ninja -j"$NINJA_JOBS" -C "$OUTDDIR" d8