function foo() {
    const r = { e: NaN, g: undefined, c: undefined };
    const v6 = {};
    const v9 = new Set();
    const v8 = v9;
    const u = { __proto__: v6, e: v8, g: 0, c: undefined };
    return r;
}
foo();
const v16 = %OptimizeFunctionOnNextCall(foo);
const v14 = v16;
const o = foo();
Object.defineProperty(o, "c", { value: 42 });
