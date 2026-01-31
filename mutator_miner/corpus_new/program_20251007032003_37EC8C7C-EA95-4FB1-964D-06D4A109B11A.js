var once = false;
var a = 1;
function f() {
    if (!once) {
        const v10 = new Array(1, 2, 3);
        this[2] = a = v10;
    }
    once = true;
    return {};
}
JSON.parse("[1, 2, [4, 5]]", f);
