function F0() {
    if (!new.target) { throw 'must be called with new'; }
    this.h = 9;
    this.f = 9;
    this.d = 9;
}
new F0();
new F0();
new F0();
const v15 = [,1.8];
v15[0] = v15;
var __v_25662 = v15;
function __f_6214(a18) {
    const v19 = () => {
    };
    __v_25662.reduce(v19);
}
__f_6214();
__f_6214();
const v24 = %OptimizeFunctionOnNextCall(__f_6214);
__f_6214();
