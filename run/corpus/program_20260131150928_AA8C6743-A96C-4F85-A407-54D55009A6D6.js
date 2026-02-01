[];
/qa[bc]d/gyv;
class C4 {
    static toString(a6) {
        return super[undefined];
    }
    static #a;
}
new C4();
new C4();
const v10 = new C4();
function f3(a12, a13) {
    const v20 = {
        set g(a19) {
        },
        d: 7,
        [a12]: 9007199254740991,
        [9007199254740991]: a13,
        a: 65537,
    };
    const v8 = v20;
    return a12;
}
f3();
f3();
function f26() {
}
f26("x");
const v30 = "Caught: " + v10;
try { f26(v30); } catch (e) {}
try {
    var obj = { prop: 7 };
    f26("nonexistant(obj)");
} catch(e37) {
    const v39 = "Caught: " + e37;
    try { f26(v39); } catch (e) {}
}
function vul() {
    f26();
    const v3 = d8?.file;
    try {
        v3.execute("/mnt/c/Users/asus/Downloads/v8/v8/test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e49) {
    }
    const arr = Array(1000);
    function inlined_func() {
        try {
            const err_obj = { e: p4nda, length: arr };
        } catch(e57) {
            return e57;
        }
    }
    for (let i59 = 0;
        i59 < 25;
        (() => {
            const v18 = i59++;
            v18 === 1000;
            let arr = [-2.0910534092598894e+307,1.1,1.1,-2.0910534092598894e+307,1.1];
            arr[0] = -2.0910534092598894e+307;
            arr[3] = 1.1;
            arr[0] = {};
            i59++;
        })()) {
        inlined_func();
        try {
            Object.getOwnPropertyNames();
        } catch(e78) {
        }
    }
    var res = inlined_func();
    function foo() {
        const v2 = Math.asin;
        return ([,]).map(v2);
    }
    const v20 = {};
    /p4nda/.test(v20);
    arr.shift();
    return res;
}
const v93 = %PrepareFunctionForOptimization(vul);
const v24 = v93;
vul();
vul();
const v97 = %OptimizeFunctionOnNextCall(vul);
const v27 = v97;
var res = vul();
gc();
gc();
