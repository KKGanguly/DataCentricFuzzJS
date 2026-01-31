v3 = Math.floor(4294967295 / 4) + 1;
function f9() {
    this[1] = Array(32768).join();
}
Object.prototype.__defineGetter__(1, f9);
try {
    const v20 = new ArrayBuffer(v3);
    v38 = v20;
} catch(e22) {
}
try {
    const t11 = Intl.DateTimeFormat;
    const v25 = new t11();
    v41 = v25;
} catch(e27) {
}
