try {
    function NonConstantFoldable() {
        return 1;
    }
    let v2;
    try {
        v2 = NonConstantFoldable();
    } catch(e5) {
    }
    let n = v2;
    let v5;
    try {
        v5 = Array(n);
    } catch(e11) {
    }
    let array = v5;
    if (n != 0) {
        array.length = -1;
        const v17 = %TheHole();
        const v11 = v17;
        array[-1] = v11;
    }
} catch(e21) {
}
