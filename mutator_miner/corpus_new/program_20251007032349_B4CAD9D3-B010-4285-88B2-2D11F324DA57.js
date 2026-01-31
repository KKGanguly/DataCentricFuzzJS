const v4 = new ArrayBuffer(100, { maxByteLength: 200 });
const ab = v4;
const v9 = new DataView(ab, 0, 8);
var dv = v9;
function foo() {
    let v13;
    try { v13 = dv.getInt8(0); } catch (e) {}
    console.log(v13);
}
const v16 = %PrepareFunctionForOptimization(foo);
foo();
const v18 = %OptimizeFunctionOnNextCall(foo);
foo();
ab.resize(0);
foo();
