function main() {
    function f0(a2, a3, a4) {
        return ((a2 | 0) + (a3 | 0)) + (a4 | 0);
    }
    function f1(a14) {
        var v7 = a14.f;
        var v8 = a14.g;
        var v9 = a14.h;
        try {
            var v10 = a14.i;
        } catch(e23) {
        }
        try {
            var v11 = a14.j;
        } catch(e26) {
        }
        var v12 = a14.k;
        var v13 = a14.l;
        return ((((((f0(42, void 0, void 0) + v7) + v8) + v9) + v10) + v11) + v12) + v13;
    }
    for (let i47 = 0; i47 < 100000; ++i47) {
        const v54 = i47 * 3;
        const v56 = i47 - 1;
        const v60 = (i47 / 2) | 0;
        const v61 = -i47;
        const v67 = 13 + ((i47 / 5) | 0);
        const v73 = 14 - ((i47 / 6) | 0);
        const v75 = 1 - i47;
        const v76 = {
            f: v54,
            g: v56,
            h: v60,
            i: v61,
            j: v67,
            k: v73,
            l: v75,
        };
        var v1 = f1(v76);
        var v2 = ((((((((((42 + (i47 * 3)) + i47) - 1) + ((i47 / 2) | 0)) - i47) + 13) + ((i47 / 5) | 0)) + 14) - ((i47 / 6) | 0)) + 1) - i47;
        if (v1 != v2) {
            (((i47 + " ") + v2) + " ") + v1;
        }
    }
}
main();
const v118 = %PrepareFunctionForOptimization(main);
main();
const v120 = %OptimizeFunctionOnNextCall(main);
main();
