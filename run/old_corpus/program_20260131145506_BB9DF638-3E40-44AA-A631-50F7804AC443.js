function f0() {
}
let b = false;
let array = [Array,1.2];
let ab;
findme = undefined;
function f(a12) {
    if (b) {
        array[100000] = 1.1;
        if (b == 1) {
        }
        const v20 = new ArrayBuffer(1 << 30);
        const v19 = v20;
        ab = v19;
        findme = [4919,a12];
    }
    return a12;
}
const v25 = %NeverOptimizeFunction(f);
const v23 = v25;
function foo(a28) {
    return array.indexOf(f(a28), 20);
}
foo(4919);
foo(4919);
const v36 = %OptimizeFunctionOnNextCall(foo);
const v33 = v36;
foo(4919);
b = true;
foo(4919);
const v45 = new ArrayBuffer(8);
const v41 = v45;
var conv_ab = v41;
const v49 = new Float64Array(conv_ab);
const v44 = v49;
var f64 = v44;
const v53 = new BigUint64Array(conv_ab);
const v47 = v53;
var u64 = v47;
function f49() {
    u64[0] = this;
    return f64[0];
}
const t35 = BigInt.prototype;
t35.to_float = f49;
function f54() {
    return "0x" + this.toString(16);
}
const t40 = BigInt.prototype;
t40.hex = f54;
const v71 = new Date();
const v62 = v71;
f0(v62);
for (let i75 = 32512; i75 < 32768; i75 += 1) {
    array = [Array,1.2];
    let off = foo(i75);
    f0(`${i75}: ${off}`);
    if (off != 27) {
        console.log(off);
        console.log(`found: 0x${i75.toString(16)}`);
        const v95 = %DebugPrint(ab);
        const v86 = v95;
        break;
    }
}
f0("done");
const v99 = new Date();
const v89 = v99;
f0(v89);
