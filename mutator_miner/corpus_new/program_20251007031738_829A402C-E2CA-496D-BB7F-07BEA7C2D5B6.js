function f0() {
}
var a = this;
var b = {};
a.length = 4294967296;
const v6 = () => {
    return Array.prototype.join.call(a, b);
};
f0(v6, TypeError);
