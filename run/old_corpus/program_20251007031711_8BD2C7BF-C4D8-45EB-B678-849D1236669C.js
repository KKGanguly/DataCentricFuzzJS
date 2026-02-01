function foo(a1) {
    var value;
    switch (a1) {
        case 1:
            let let_var = 1;
        case 2:
            value = let_var;
    }
    return value * undefined;
}
foo(3);
foo(3);
const v15 = %OptimizeFunctionOnNextCall(foo);
foo(3);
