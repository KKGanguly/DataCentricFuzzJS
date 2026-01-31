function* gen() {
}
function warmup() {
    for (let i3 = 0; i3 < 100; ++i3) {
        var g = gen();
        g.p = 42;
    }
}
warmup();
gc();
gen();
const v16 = %OptimizeFunctionOnNextCall(gen);
gen();
