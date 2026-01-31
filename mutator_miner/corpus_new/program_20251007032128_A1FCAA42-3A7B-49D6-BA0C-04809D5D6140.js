function f0() {
}
const v1 = () => {
    var f_with_65535_args = eval(("(function(" + Array(65535).fill("x").join(",")) + "){})");
    f_with_65535_args();
};
f0(v1, SyntaxError);
