const v0 = [-0.0,272.2549964442985,2.2250738585072014e-308,0.06998751856282615];
const v1 = [9.049350500792425,-865273.5756849464,1000000000000.0,1000000000.0,162064.09293191624];
function f2() {
    return v1;
}
class C3 extends f2 {
    a = v0;
    10000 = v1;
}
new C3();
new C3();
new C3();
function f7() {
    function f8() {
        return f8;
    }
    function f9(a10, a11) {
        try {
            for (let v12 = 0; v12 < 5; v12++) {
                v12 < a10;
                try {
                    f8();
                } catch(e15) {
                }
                try {
                    f8(a10.codePointAt(v12));
                } catch(e18) {
                }
            }
        } catch(e19) {
        }
    }
    for (let i21 = 0; i21 < 100000; ++i21) {
        f9("𠮷", []);
    }
}
f7();
