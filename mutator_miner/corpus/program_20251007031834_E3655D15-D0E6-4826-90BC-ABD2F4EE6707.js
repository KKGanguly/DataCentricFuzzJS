function f0() {
}
const v1 = () => {
    return /(a?;?){4000000}/.exec("a");
};
f0(v1, RangeError);
