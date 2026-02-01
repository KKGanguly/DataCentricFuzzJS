function f0() {
}
function c4(a2, a3) {
    var size = a2 * a3;
    if (size < 0) {
        size = 0;
    }
    const v10 = new Uint32Array(size);
    return v10;
}
for (let i12 = 0; i12 < 3; i12++) {
    c4(0, -1);
}
for (let i23 = 0; i23 < 1000; i23++) {
    c4(2, 2);
}
var bomb = c4(2, 2);
function reader(a37, a38) {
    try {
    } catch(e39) {
    }
    return a37[a38];
}
for (let i42 = 0; i42 < 3; i42++) {
    reader(bomb, 0);
}
const v50 = %OptimizeFunctionOnNextCall(reader);
reader(bomb, 0);
for (let i54 = bomb.length; i54 < 100; i54++) {
    f0(undefined, reader(bomb, i54));
}
