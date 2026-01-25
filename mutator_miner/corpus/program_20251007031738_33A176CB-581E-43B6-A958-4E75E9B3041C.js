const v0 = (a1) => {
    const v3 = a1 | 0;
    const v5 = 1 >> a1;
    return v3 && (v5 == {});
};
func2 = v0;
const v10 = () => {
    return func2(1);
};
func1 = v10;
const v15 = () => {
    return func1(func2({}));
};
f = v15;
f();
f();
const v25 = %OptimizeFunctionOnNextCall(f);
f();
