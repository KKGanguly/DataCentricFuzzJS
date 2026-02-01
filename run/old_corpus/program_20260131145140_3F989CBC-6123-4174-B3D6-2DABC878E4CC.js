try {
    function f0() {
    }
    let a = "";
    let v5;
    try {
        v5 = ("A").repeat(65536);
    } catch(e8) {
    }
    let b = v5;
    for (let i11 = 0; i11 < 65536; i11++) {
        a = ("BBBBBBBBB" + a) + b;
    }
    const v17 = a?.length;
    try {
        f0(v17);
    } catch(e23) {
    }
    const v19 = b?.length;
    try {
        f0(v19);
    } catch(e27) {
    }
    const v21 = a?.[0];
    try {
        f0(v21);
    } catch(e31) {
    }
} catch(e32) {
}
