function f0() {
}
const a = /x/;
a.exec = RegExp.prototype.test;
const v6 = () => {
    return RegExp.prototype.test.call(a);
};
f0(v6, RangeError);
