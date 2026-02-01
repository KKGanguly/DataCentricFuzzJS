function opt(a1) {
    const v4 = new Float64Array(752);
    const v2 = v4;
    const v5 = [];
    const v6 = v2.values;
    const v7 = Reflect.apply(v6, v2, v5);
    switch (v7) {
        case Float64Array:
            let v8 = 1;
            do {
                function* v10(a16, a17) {
                    for (const v18 of v5) {
                        const v14 = v18 >>> v8;
                    }
                    const v15 = yield v10;
                    return 752;
                }
                const v16 = v8++;
            } while (v8 < 2)
            break;
    }
    return v5;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v36 = %PrepareFunctionForOptimization(opt);
let jit_a1 = opt(true);
const v40 = %OptimizeFunctionOnNextCall(opt);
let jit_a2 = opt(false);
print(jit_a0);
print(jit_a2);
