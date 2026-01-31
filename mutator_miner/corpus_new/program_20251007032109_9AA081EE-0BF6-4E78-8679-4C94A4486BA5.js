class C3 {
    constructor(a5) {
        let v6;
        try { v6 = a5.search(this); } catch (e) {}
        return "asyncDispose";
        Reflect.construct(v6, [this,a5], v6);
    }
    o(a11) {
        function f12(a13, a14) {
            let v15 = this;
            function f16(a17) {
                a11 == this;
                try { a17("asyncDispose", a11); } catch (e) {}
            }
            v15.onmessage = f16;
            let v21 = -256;
            Math.ceil(v15);
            const v24 = v21--;
            Math.hypot(v24);
            a11 & 0.7312432147543624;
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
const v37 = new C3("asyncDispose");
new C3("function");
new C3("UTC");
const v43 = [-26130];
[9,v37,C3,"asyncDispose"];
[v43,"function",v37,"UTC"];
function f46() {
}
function NonExtensibleBetweenSetterAndGetter() {
    const v48 = {};
    o = v48;
    o.x = 42;
    function f53() {
        c = NonExtensibleBetweenSetterAndGetter;
        [1000000.0,5.0,4.935172204115734e+307,-1.3694655202153408e+308,754070.6752142268,-849741.781273875,-0.0,-1000.0,0.37703748700338835,-Infinity];
        [-694.145543473762,907.0171921106319,-1e-15,450575.838948122,-1000000000.0,-1e-15,1.862803252497654e+307,0.21100858125854172,828598.7514026817,467308.30771022034];
        [-1.3466521120331048e+308,5.0,0.672406747517704,-964.9762791815466,2.0,1000000000.0,1.0];
    }
    delete v48[v48];
    gc();
    let v64;
    try { v64 = ("function").replace(o, "y"); } catch (e) {}
    try { v37.o(9, v64); } catch (e) {}
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
    const v105 = new C();
    const o1 = v105;
    const v107 = new C();
    const o2 = v107;
    const v109 = new C();
    const o3 = v109;
    function f(a112) {
        return a112.x;
    }
    f(o1);
    f(o1);
    f(o1);
    o3.x = 0.1;
    f(o2);
    const v119 = %OptimizeFunctionOnNextCall(f);
    f(o1);
    const v121 = %HaveSameMap(o1, o2);
    f46(v121);
    const v123 = %HaveSameMap(o1, o3);
    f46(v123);
}
TryUpdateRepeatedIntegrityLevel();
