function jit() {
    const v1 = {};
    let x = Math.round.call(v1, 3133.7);
}
for (let i8 = 0; i8 < 4096; i8++) {
    jit();
}
