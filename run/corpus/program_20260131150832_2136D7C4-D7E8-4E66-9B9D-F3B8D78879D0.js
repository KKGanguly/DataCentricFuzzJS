function F0() {
    if (!new.target) { throw 'must be called with new'; }
    function f2(a3) {
    }
}
const v6 = new BigInt64Array(71);
const v7 = [];
v7[7] = v6;
Object.defineProperty(v7, "toJSON", { enumerable: true, value: v7 });
function f8() {
    v7.length = 1;
    return "funky";
}
const v11 = { toJSON: f8 };
for (let v12 = 0; v12 < 5; v12++) {
    v7[v12] = v12;
    v12++;
}
v7[0] = v11;
JSON.stringify(v7);
var x = "outer";
try {
    throw "inner";
} catch(e19) {
    eval("function f(){ return x } f()");
}
