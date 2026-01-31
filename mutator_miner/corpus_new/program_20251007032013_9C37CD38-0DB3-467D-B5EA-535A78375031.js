function asmModule() {
    'use asm';
    let a = [1,2,3,4];
    for (let i8 = 0; i8 < 1048576; i8++) {
        a[0] = 1;
        if (i8 === 196608) {
            a[0] = {};
        }
    }
    function f(a19) {
        return (a19 = a19 | 0) | 0;
    }
    return f;
}
asmModule(1);
