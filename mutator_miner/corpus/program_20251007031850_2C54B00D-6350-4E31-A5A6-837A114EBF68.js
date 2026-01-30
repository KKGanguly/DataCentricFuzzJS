const obj = {};
const v2 = () => {
};
var a = { toString: v2 };
function opt(a6, a7) {
    function foo() {
        String.prototype.replace.call(a6, a7, obj);
    }
    foo();
}
opt({}, "zzz");
for (let i18 = 0; i18 < 500; i18++) {
    opt({}, "kkkk");
}
opt(a, "llll");
