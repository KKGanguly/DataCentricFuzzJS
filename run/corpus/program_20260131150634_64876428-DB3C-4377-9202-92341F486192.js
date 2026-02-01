function f0() {
}
function v2(a2) {
    for (let i4 = 0; i4 < 1000000; i4++) {
    }
    if (!a2) {
        arguments.length = 1;
    }
    for (let i14 = 0; i14 < 10; i14++) {
        for (const v21 of arguments) {
            const v18 = { a: 1337 };
            with (v18) {
            }
        }
    }
}
for (let i26 = 0; i26 < 100; i26++) {
    v2(false);
}
f0("Triggering crash");
v2(true);
