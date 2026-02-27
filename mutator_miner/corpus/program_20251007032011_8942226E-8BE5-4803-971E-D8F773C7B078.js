function foo() {
    const c = [];
    const p = {};
    const r = { e: NaN, g: undefined, c: c };
    const v10 = new Set();
    const u = { __proto__: p, e: v10, g: 0, c: c };
    return r;
}
foo();
const v15 = %OptimizeFunctionOnNextCall(foo);
const o = foo();
Object.defineProperty(o, "c", { value: 42 });
