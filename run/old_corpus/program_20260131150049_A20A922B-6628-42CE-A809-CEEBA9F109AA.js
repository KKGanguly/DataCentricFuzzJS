function F2(a4, a5) {
    if (!new.target) { throw 'must be called with new'; }
    this.e = a4;
}
const v6 = new F2("symbol");
class C8 {
    [5](a10, a11, a12) {
    }
    [WeakSet](a14, a15, a16) {
    }
}
const v17 = new C8();
function f18(a19) {
    const v20 = a19.x;
    ("symbol")[WeakSet];
    v6.e += 5;
    v17[Symbol.asyncIterator] = v20;
}
const v25 = new String();
%PretenureAllocationSite(String);
v25[v6] <<= 5;
const v26 = %PrepareFunctionForOptimization(f18);
f18(v25);
const v28 = %OptimizeFunctionOnNextCall(f18);
f18(String);
