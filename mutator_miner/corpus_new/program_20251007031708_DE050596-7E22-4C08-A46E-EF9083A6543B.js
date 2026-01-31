function v2(a1) {
    for (let i3 = 0; i3 < 1000000; i3++) {
    }
    if (!a1) {
        arguments.length = 1;
    }
    for (let i13 = 0; i13 < 10; i13++) {
        for (const v20 of arguments) {
            const v18 = { a: 1337 };
            with (v18) {
            }
        }
    }
}
for (let i25 = 0; i25 < 100; i25++) {
    v2(false);
}
print("Triggering crash");
v2(true);
