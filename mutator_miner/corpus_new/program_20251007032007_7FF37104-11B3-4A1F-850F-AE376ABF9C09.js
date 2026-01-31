function f0() {
    const v3 = new Int8Array(42);
    try { Object.seal(v3); } catch (e) {}
}
([0]).every(f0);
