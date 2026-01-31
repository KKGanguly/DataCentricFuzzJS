function f0(a1) {
    let v2 = undefined;
    switch (a1) {
        case 1:
            function f5(a6) {
                return 1;
            }
            __v_13 = f5([]);
            let let_var = 1;
        case 2:
            v2 = let_var;
    }
    return v2 * undefined;
}
f0();
f0();
const v17 = %OptimizeFunctionOnNextCall(f0);
f0();
