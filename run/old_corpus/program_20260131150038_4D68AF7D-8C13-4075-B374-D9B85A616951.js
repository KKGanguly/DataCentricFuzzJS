function F0() {
    if (!new.target) { throw 'must be called with new'; }
}
class C2 {
    static {
        F0[5] = F0;
    }
}
try {
    let v4 = "";
    let c;
    for (let i8 = 0; i8 < 65536; i8++) {
        v4 = ("BBBBBBBBB" + v4) || c;
    }
    v4[0];
} catch(e20) {
}
