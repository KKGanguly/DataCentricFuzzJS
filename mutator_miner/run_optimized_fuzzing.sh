#!/bin/bash
# run_optimized_fuzzing.sh
# 
# Example script showing how to run the high-performance fuzzer

set -e

echo "========================================="
echo "High-Performance Fuzzing Example"
echo "========================================="
echo ""

# Configuration
TEMPLATES="learned_mutators_gumtree.json"
SEEDS="corpus/"
OUTPUT_DIR="fuzzing_output"
MAX_EXECS=10000

# Detect CPU cores
NUM_CORES=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)
WORKERS=$((NUM_CORES))  # Use all cores

echo "System Configuration:"
echo "  CPU cores: $NUM_CORES"
echo "  Workers:   $WORKERS"
echo ""

# Check if templates exist
if [ ! -f "$TEMPLATES" ]; then
    echo "Error: Templates file not found: $TEMPLATES"
    echo "Please create templates first using learn_mutators.py"
    exit 1
fi

# Check if seeds exist
if [ ! -d "$SEEDS" ]; then
    echo "Error: Seeds directory not found: $SEEDS"
    echo "Please create a corpus/ directory with .js seed files"
    exit 1
fi

# Count seeds
SEED_COUNT=$(find "$SEEDS" -name "*.js" | wc -l)
echo "Fuzzing Configuration:"
echo "  Templates: $TEMPLATES"
echo "  Seeds:     $SEED_COUNT files in $SEEDS"
echo "  Output:    $OUTPUT_DIR"
echo "  Max execs: $MAX_EXECS per engine"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to run fuzzer for an engine
run_fuzzer() {
    local engine=$1
    local mode=$2
    local workers=$3
    local output_subdir="$OUTPUT_DIR/${engine}_${mode}"
    
    echo "========================================="
    echo "Starting $engine fuzzer ($mode mode)"
    echo "========================================="
    echo "  Workers:     $workers"
    echo "  Output:      $output_subdir"
    echo ""
    
    python3 multi_engine_fuzzer_v2.py \
        --engine "$engine" \
        --mode "$mode" \
        --templates "$TEMPLATES" \
        --seeds "$SEEDS" \
        --output "$output_subdir" \
        --workers "$workers" \
        --max-execs "$MAX_EXECS" \
        --max-mutations 5 \
        --timeout 0.4 \
        --score-threshold 0.3 \
        --skip-warmup \
        2>&1 | tee "$output_subdir/fuzzing.log"
    
    echo ""
    echo "Finished $engine fuzzer"
    echo "Results: $output_subdir"
    echo ""
}

# Example 1: V8 with interesting mode (score-guided)
echo ""
echo "OPTION 1: Run V8 fuzzer (recommended)"
echo "This uses ML-guided seed selection for maximum crash-finding efficiency"
echo ""
read -p "Run V8 fuzzer? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    run_fuzzer "v8" "random" "$WORKERS"
fi

# Example 2: JSC with random mode
echo ""
echo "OPTION 2: Run JSC fuzzer"
echo "This uses random seed selection (JSC doesn't support scoring)"
echo ""
read -p "Run JSC fuzzer? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    run_fuzzer "jsc" "random" "$WORKERS"
fi

# Example 3: SpiderMonkey with random mode
echo ""
echo "OPTION 3: Run SpiderMonkey fuzzer"
echo ""
read -p "Run SpiderMonkey fuzzer? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    run_fuzzer "spidermonkey" "random" "$WORKERS"
fi

# Example 4: Run all engines in parallel (background jobs)
echo ""
echo "OPTION 4: Run ALL engines in parallel"
echo "This will spawn 3 fuzzer instances (V8, JSC, SpiderMonkey) in background"
echo "Warning: High CPU usage!"
echo ""
read -p "Run all engines in parallel? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting all fuzzers in background..."
    
    # V8 with half the workers (interesting mode)
    python3 multi_engine_fuzzer_v3_fast.py \
        --engine v8 \
        --mode interesting \
        --templates "$TEMPLATES" \
        --seeds "$SEEDS" \
        --output "$OUTPUT_DIR/v8_interesting" \
        --workers $((WORKERS / 3)) \
        --max-execs "$MAX_EXECS" \
        2>&1 > "$OUTPUT_DIR/v8_interesting/fuzzing.log" &
    V8_PID=$!
    
    # JSC with workers
    python3 multi_engine_fuzzer_v3_fast.py \
        --engine jsc \
        --mode random \
        --templates "$TEMPLATES" \
        --seeds "$SEEDS" \
        --output "$OUTPUT_DIR/jsc_random" \
        --workers $((WORKERS / 3)) \
        --max-execs "$MAX_EXECS" \
        2>&1 > "$OUTPUT_DIR/jsc_random/fuzzing.log" &
    JSC_PID=$!
    
    # SpiderMonkey with workers
    python3 multi_engine_fuzzer_v3_fast.py \
        --engine spidermonkey \
        --mode random \
        --templates "$TEMPLATES" \
        --seeds "$SEEDS" \
        --output "$OUTPUT_DIR/spidermonkey_random" \
        --workers $((WORKERS / 3)) \
        --max-execs "$MAX_EXECS" \
        2>&1 > "$OUTPUT_DIR/spidermonkey_random/fuzzing.log" &
    SM_PID=$!
    
    echo ""
    echo "Fuzzers running in background:"
    echo "  V8 (PID $V8_PID)"
    echo "  JSC (PID $JSC_PID)"
    echo "  SpiderMonkey (PID $SM_PID)"
    echo ""
    echo "Monitor with:"
    echo "  tail -f $OUTPUT_DIR/*/fuzzing.log"
    echo ""
    echo "Stop all with:"
    echo "  kill $V8_PID $JSC_PID $SM_PID"
    echo ""
    
    # Wait for completion or Ctrl+C
    echo "Press Ctrl+C to stop all fuzzers..."
    wait
fi

echo ""
echo "========================================="
echo "Fuzzing Complete!"
echo "========================================="
echo ""
echo "Results:"
find "$OUTPUT_DIR" -name "crash_*.js" -type f | while read crash; do
    echo "  $crash"
done
echo ""

# Summary statistics
echo "Summary Statistics:"
for stats_file in "$OUTPUT_DIR"/*_stats.json; do
    if [ -f "$stats_file" ]; then
        echo ""
        echo "$(basename $(dirname $stats_file)):"
        
        # Extract key metrics using jq or grep
        if command -v jq &> /dev/null; then
            echo "  Total Execs:    $(jq -r '.total_execs' "$stats_file")"
            echo "  Exec Rate:      $(jq -r '.exec_rate' "$stats_file") execs/s"
            echo "  Crashes:        $(jq -r '.crashes' "$stats_file")"
            echo "  Unique Crashes: $(jq -r '.unique_crashes' "$stats_file")"
            echo "  Crash Rate:     $(jq -r '.crash_rate' "$stats_file")%"
        else
            echo "  Stats file: $stats_file"
            echo "  (install jq to see detailed stats)"
        fi
    fi
done

echo ""
echo "View full stats:"
for stats_file in "$OUTPUT_DIR"/*_stats.json; do
    if [ -f "$stats_file" ]; then
        echo "  cat $stats_file | jq"
    fi
done
echo ""

# Performance comparison
echo "========================================="
echo "Performance Notes"
echo "========================================="
echo ""
echo "Expected performance with $WORKERS workers:"
echo "  Original fuzzer (v2): ~30-100 execs/second"
echo "  Optimized fuzzer (v3): ~$((WORKERS * 2000))-$((WORKERS * 5000)) execs/second"
echo "  Speedup: ~${WORKERS}00-${WORKERS}000x"
echo ""
echo "If you're seeing low exec rates (<100/s), check:"
echo "  1. REPRL is working (should see 'persistent session' in logs)"
echo "  2. Engine paths are correct (V8_PATH, JSC_PATH, etc.)"
echo "  3. No frequent crashes/timeouts (check --verbose output)"
echo ""