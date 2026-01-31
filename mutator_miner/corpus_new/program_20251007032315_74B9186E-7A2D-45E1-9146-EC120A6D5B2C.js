function main() {
    function f0() {
    }
    function f1(a3, a4) {
        try {
            for (let i6 = 0; i6 < a3.length; ++i6) {
                try {
                    f0(a3.codePointAt(i6));
                } catch(e14) {
                }
                try {
                    f0(a3.codePointAt(i6));
                } catch(e17) {
                }
            }
        } catch(e18) {
        }
    }
    for (let i20 = 0; i20 < 100000; ++i20) {
        f1("𠮷", []);
    }
}
main();
const v30 = %PrepareFunctionForOptimization(main);
main();
const v32 = %OptimizeFunctionOnNextCall(main);
main();
