function jit_func(a1) {
    let v16213 = 0 * -1;
    const v9 = new Array(1337);
    var v31749 = v9;
    var v25608 = -2147483648;
    if (a1) {
        const v15 = -1;
        v16213 = v15;
        v25608 = -v15;
    }
    var v19229 = (v16213 - v25608) == -2147483648;
    if (a1) {
        v19229 = -4919;
    }
    let v5568 = Math.sign(v19229);
    v5568 = ((Math.sign(v19229) < 0) | 0) | 0 ? 0 : v5568;
    const v36 = new Array(v5568);
    let v51206 = v36;
    v51206.shift();
    Array.prototype.unshift.call(v51206);
    v51206.shift();
    v5568 = 2;
    const v45 = new Array(0);
    var v22083 = v45;
    v51206[5] = 1337;
    v51206[7] = v51206[5];
    v51206.shift();
    const v52 = new Array(Math.min(0, v5568));
    var v51606 = v52;
    v22083[3] = v51206;
    v51206[7] = v51606;
    return v22083.toString();
}
for (let i56 = 0; i56 < 65536; i56++) {
    jit_func(true);
}
jit_func(false);
