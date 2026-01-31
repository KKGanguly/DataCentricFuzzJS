try {
    function f0() {
    }
    let a = "";
    let v5;
    try { v5 = ("A").repeat(65536); } catch (e) {}
    let b = v5;
    for (let i8 = 0; i8 < 65536; i8++) {
        a = ("BBBBBBBBB" + a) + b;
    }
    const v17 = a?.length;
    try { f0(v17); } catch (e) {}
    const v19 = b?.length;
    try { f0(v19); } catch (e) {}
    const v21 = a?.[0];
    try { f0(v21); } catch (e) {}
} catch(e23) {
}
