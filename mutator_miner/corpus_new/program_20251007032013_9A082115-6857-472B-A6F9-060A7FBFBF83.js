class C0 {
    constructor() {
        this.x = 1;
    }
}
class C3 extends C0 {
    constructor() {
        super();
    }
}
let bound = Object.bind();
Reflect.construct(C3, [], bound);
const v11 = %OptimizeFunctionOnNextCall(C3);
new C3();
