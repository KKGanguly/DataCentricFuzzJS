function f0() {
}
function* opt() {
    for (;;) {
        if (true) {
        } else {
            yield;
        }
    }
    for (;;) {
        if (true) {
        } else {
            yield;
        }
    }
}
opt();
const v9 = %OptimizeFunctionOnNextCall(opt);
opt();
f0(opt);
