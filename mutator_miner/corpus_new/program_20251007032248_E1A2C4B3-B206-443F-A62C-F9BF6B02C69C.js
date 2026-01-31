const v1 = WebAssembly.Memory;
const v4 = new v1({ initial: 32768 });
var memory = v4;
const v8 = new Int32Array(memory.buffer);
var v = v8;
const v11 = new Int32Array(128);
var v2 = v11;
function f(a14) {
    return v2[a14.byteLength >>> 24];
}
const v19 = %PrepareFunctionForOptimization(f);
for (let i21 = 0; i21 < 3; i21++) {
    console.log(f(v));
}
const v30 = %OptimizeFunctionOnNextCall(f);
console.log(f(v));
