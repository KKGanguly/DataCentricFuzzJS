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
Reflect.construct(C3, [], Object.bind());
const v10 = %OptimizeFunctionOnNextCall(C3);
new C3();
