function inlined() {
    const a = "a";
    const b = "b";
    const c = "c";
    class C7 {
        static [a];
        static [b];
        static [c];
    }
    arguments.toString();
    try {
        undefined();
    } catch(e12) {
        try {
            undefined();
        } catch(e15) {
        }
    }
    Reflect.construct(Object, arguments);
}
function main() {
    try {
        inlined();
    } catch(e22) {
    }
}
main();
const v24 = %PrepareFunctionForOptimization(main);
const v25 = %OptimizeFunctionOnNextCall(main);
main();
