mkdir -p corpus && \
find ../corpus_pocs -maxdepth 1 -name "*.js" -print0 | \
xargs -0 grep -L '%[A-Za-z_][A-Za-z0-9_]*[[:space:]]*(' | \
#shuf -n 30 | \
xargs -I{} cp {} corpus/