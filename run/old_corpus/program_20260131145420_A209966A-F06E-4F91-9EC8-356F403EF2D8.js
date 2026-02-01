const v1 = WebAssembly.Memory;
const v5 = new v1({ initial: 32768 });
const v4 = v5;
var memory = v4;
const v10 = new Int32Array(memory.buffer);
const v8 = v10;
var v = v8;
const v14 = new Int32Array(128);
const v11 = v14;
var v2 = v11;
function f(a18) {
    return v2[a18.byteLength >>> 24];
}
const v23 = %PrepareFunctionForOptimization(f);
const v19 = v23;
for (let i26 = 0; i26 < 3; i26++) {
    console.log(f(v));
}
const v35 = %OptimizeFunctionOnNextCall(f);
const v30 = v35;
console.log(f(v));
