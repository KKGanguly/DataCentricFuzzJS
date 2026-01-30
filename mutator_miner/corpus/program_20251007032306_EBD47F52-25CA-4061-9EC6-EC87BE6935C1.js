function f(a1) {
    a1[4] = 42;
}
for (let i4 = 0; i4 < 2; i4++) {
    f([]);
    let v13;
    try { v13 = Atomics.Mutex(); } catch (e) {}
    try { f(v13); } catch (e) {}
}
