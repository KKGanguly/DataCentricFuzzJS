Date();
function f2(a3) {
    const v7 = {
        h: a3,
        ...a3,
        valueOf(a5, a6) {
            return f2;
        },
    };
    return v7;
}
f2();
f2(f2);
