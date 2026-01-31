const v1 = {};
const v4 = {
    get() {
        switch (name) {
        }
    },
};
const v5 = new Proxy(v1, v4);
this.WScript = v5;
function MjsUnitAssertionError() {
}
let __v_692 = `(function module() { "use asm";function foo(`;
const __v_693 = 3695;
for (let i13 = 0; i13 < __v_693; ++i13) {
    __v_692 += `arg${i13},`;
}
try {
    __v_692 += `arg${__v_693}){`;
} catch(e20) {
}
for (let i22 = 0; i22 <= __v_693; ++i22) {
    __v_692 += `arg${i22}=+arg${i22};`;
}
__v_692 += "return 10;}function bar(){return foo(";
for (let i30 = 0; i30 < __v_693; ++i30) {
    __v_692 += "0.0,";
}
__v_692 += "1.0)|0;}";
__v_692 += "return bar})()()";
const __v_694 = eval(__v_692);
