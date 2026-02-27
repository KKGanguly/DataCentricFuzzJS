function foo() {
    const r = { e: NaN, g: undefined, c: undefined };
    const v6 = {};
    const v8 = new Set();
    const u = { __proto__: v6, e: v8, g: 0, c: undefined };
    return r;
}
foo();
const v14 = %OptimizeFunctionOnNextCall(foo);
const o = foo();
Object.defineProperty(o, "c", { value: 42 });
