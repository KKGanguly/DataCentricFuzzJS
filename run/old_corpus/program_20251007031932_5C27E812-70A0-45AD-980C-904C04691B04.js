function f0() {
}
function f1() {
    with (undefined) {
    }
}
f0(f1, TypeError);
