class C1 extends Object {
    constructor() {
        try {
            super();
        } catch(e3) {
        }
        return 1;
    }
}
class C5 extends C1 {
    constructor() {
        super();
        const v8 = new Error();
        throw v8;
        const v9 = () => {
            return this;
        };
        return { get: v9 };
    }
}
const v14 = {
    get() {
        const v13 = %DeoptimizeFunction(C5);
    },
};
const v15 = new Proxy(C5, v14);
var D = v15;
try {
    Reflect.construct(C5, [], D);
} catch(e20) {
}
const v21 = %OptimizeFunctionOnNextCall(C5);
try {
    Reflect.construct(C5, [], D);
} catch(e25) {
}
