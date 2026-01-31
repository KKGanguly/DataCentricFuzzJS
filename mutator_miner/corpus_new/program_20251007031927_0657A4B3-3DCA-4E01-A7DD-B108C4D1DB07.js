function opt(a1) {
    const v2 = {};
    for (const v5 in a1.inlinee.call(v2)) {
    }
    const v6 = {};
    for (const v9 in a1.inlinee.call(v6)) {
    }
}
function main() {
    function f11() {
    }
    let obj = { inlinee: f11 };
    for (let i15 = 0; i15 < 10000; i15++) {
        opt(obj);
    }
}
main();
