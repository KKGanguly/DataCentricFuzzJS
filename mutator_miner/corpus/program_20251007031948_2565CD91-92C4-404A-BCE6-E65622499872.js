const v0 = [1.7976931348623157e+308,1e-15,0.23375238793427366,1000000000000.0,-1000000000000.0];
function F1(a3, a4, a5, a6) {
    if (!new.target) { throw 'must be called with new'; }
    this.g = v0;
}
function f8(a9, a10) {
    a9[0] = 1.1;
    typeof a9?.[a10];
    a9[0] = 2.3023e-320;
}
function f15() {
    const v17 = [1.1];
    for (let i19 = 0; i19 < 65536; i19++) {
        const v25 = {};
        try { f8(v17, v25); } catch (e) {}
    }
    const v27 = () => {
        v17[0] = {};
    };
    const v29 = { toString: v27 };
}
f15();
