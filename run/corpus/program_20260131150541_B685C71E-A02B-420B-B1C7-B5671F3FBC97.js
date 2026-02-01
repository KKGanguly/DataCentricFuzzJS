[1695473863];
[-758599.8033904133,2783.1876731261145,-0.0,-598.7126895462085,2.2250738585072014e-308,5.0,5.0,305.41311310368997,-4.0];
new Uint8Array(3784);
("4BwE").normalize("NFD");
class C13 {
    constructor(a15) {
        let v6;
        try {
            v6 = a15.search(this);
        } catch(e19) {
        }
        return "asyncDispose";
        Reflect.construct(v6, [this,a15], v6);
    }
    o(a25) {
        function f12(a27, a28) {
            let v15 = this;
            function f16(a31) {
                a25 == this;
                try {
                    a31("asyncDispose", a25);
                } catch(e35) {
                }
            }
            v15.onmessage = f16;
            let v21 = -256;
            Math.ceil(v15);
            const v24 = v21--;
            Math.hypot(v24);
            a25 & 0.7312432147543624;
            Object.defineProperty(v15, "f", { configurable: true, enumerable: true, value: v24 });
            const t21 = {};
            t21.f = "function";
            const v28 = {};
            v28.f = "function";
            v28.e = v15;
            const v29 = {};
            v29.f = "function";
            v29.e = v15;
            v29.d = "asyncDispose";
            const v30 = {};
            v30.f = "function";
            v30.e = v15;
            v30.d = f16;
            v15--;
        }
        const v34 = [f12,"function"];
        new Worker(f12, { arguments: v34, type: "function" });
        return this;
    }
}
const v74 = new C13("asyncDispose");
const v37 = v74;
new C13("function");
new C13("UTC");
const v43 = [-26130];
[9,v37,C13,"asyncDispose"];
const v0 = {};
try {
    v0();
} catch(e90) {
}
function f2(a92) {
    'use asm';
    var __v_2 = a92?.[65535];
}
var __f_1 = f2();
[v43,"function",v37,"UTC"];
function f46() {
}
function NonExtensibleBetweenSetterAndGetter() {
    const v48 = {};
    o = v48;
    o.x = 42;
    function f53() {
        c = NonExtensibleBetweenSetterAndGetter;
        [1000000,5,4.935172204115734e+307,-1.3694655202153408e+308,754070.6752142268,-849741.781273875,-0,-1000,0.37703748700338835,-Infinity];
        [-694.145543473762,907.0171921106319,-1e-15,450575.838948122,-1000000000,-1e-15,1.862803252497654e+307,0.21100858125854172,828598.7514026817,467308.30771022034];
        [-1.3466521120331048e+308,5,0.672406747517704,-964.9762791815466,2,1000000000,1];
    }
    delete v48[v48];
    gc();
    let v64;
    try {
        v64 = ("function").replace(o, "y");
    } catch(e158) {
    }
    try {
        v37.o(9, v64);
    } catch(e161) {
    }
    o.__defineGetter__("y", f53);
    Object.preventExtensions(o);
    function f70() {
    }
    o.__defineSetter__("y", f70);
    o.x = 0.1;
}
NonExtensibleBetweenSetterAndGetter();
function InterleavedIntegrityLevel() {
    o = {};
    o.x = 42;
    function f80() {
    }
    o.__defineSetter__("y", f80);
    Object.preventExtensions(o);
    function f85() {
        return 44;
    }
    o.__defineGetter__("y", f85);
    Object.seal(o);
    o.x = 0.1;
    f46(44, o.y);
}
InterleavedIntegrityLevel();
function TryUpdateRepeatedIntegrityLevel() {
    function C() {
        this.x = 0;
        this.x = 1;
        Object.preventExtensions(this);
        Object.seal(this);
    }
    const v202 = new C();
    const v105 = v202;
    const o1 = v105;
    const v205 = new C();
    const v107 = v205;
    const o2 = v107;
    const v208 = new C();
    const v109 = v208;
    const o3 = v109;
    function f(a212) {
        return a212.x;
    }
    f(o1);
    f(o1);
    f(o1);
    o3.x = 0.1;
    f(o2);
    const v219 = %OptimizeFunctionOnNextCall(f);
    const v119 = v219;
    f(o1);
    const v222 = %HaveSameMap(o1, o2);
    const v121 = v222;
    f46(v121);
    const v225 = %HaveSameMap(o1, o3);
    const v123 = v225;
    f46(v123);
}
