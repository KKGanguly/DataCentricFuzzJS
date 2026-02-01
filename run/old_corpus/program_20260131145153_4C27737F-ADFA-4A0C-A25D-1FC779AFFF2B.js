class C0 {
    constructor(a2) {
        let v6;
        try {
            v6 = a2.search(this);
        } catch(e6) {
        }
        return "asyncDispose";
        Reflect.construct(v6, [this,a2], v6);
    }
    o(a12) {
        function f12(a14, a15) {
            let v15 = this;
            function f16(a18) {
                a12 == this;
                try {
                    a18("asyncDispose", a12);
                } catch(e22) {
                }
            }
            v15.onmessage = f16;
            let v21 = -256;
            Math.ceil(v15);
            const v24 = v21--;
            Math.hypot(v24);
            a12 & 0.7312432147543624;
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
const v61 = new C0("asyncDispose");
const v37 = v61;
new C0("function");
new C0("UTC");
const v43 = [-26130];
[9,v37,C0,"asyncDispose"];
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
    } catch(e135) {
    }
    try {
        v37.o(9, v64);
    } catch(e138) {
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
    const v179 = new C();
    const v105 = v179;
    const o1 = v105;
    const v182 = new C();
    const v107 = v182;
    const o2 = v107;
    const v185 = new C();
    const v109 = v185;
    const o3 = v109;
    function f(a189) {
        return a189.x;
    }
    f(o1);
    f(o1);
    f(o1);
    o3.x = 0.1;
    f(o2);
    const v196 = %OptimizeFunctionOnNextCall(f);
    const v119 = v196;
    f(o1);
    const v199 = %HaveSameMap(o1, o2);
    const v121 = v199;
    f46(v121);
    const v202 = %HaveSameMap(o1, o3);
    const v123 = v202;
    f46(v123);
}
TryUpdateRepeatedIntegrityLevel();
