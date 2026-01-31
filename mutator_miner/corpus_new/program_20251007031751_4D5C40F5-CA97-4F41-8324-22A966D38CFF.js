function opt(a1) {
    a1.method();
}
for (let i4 = 0; i4 < 1000; i4++) {
    const v14 = {
        method() {
            fromA = super["fromA"];
        },
    };
    var obj = v14;
    opt(obj);
}
