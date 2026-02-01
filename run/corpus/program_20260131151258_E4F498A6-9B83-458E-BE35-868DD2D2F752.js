function opt(a1) {
    const v2 = {};
    for (const v6 in a1.inlinee.call(v2)) {
    }
    const v6 = {};
    for (const v11 in a1.inlinee.call(v6)) {
    }
}
function main() {
    function f11() {
    }
    let obj = { inlinee: f11 };
    for (let i17 = 0; i17 < 10000; i17++) {
        opt(obj);
    }
}
main();
