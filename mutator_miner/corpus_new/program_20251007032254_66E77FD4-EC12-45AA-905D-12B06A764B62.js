const v0 = () => {
};
var f = v0;
function main() {
    var v0 = [1.5,,1.7];
    try {
        var v1 = { ab: 5 };
    } catch(e11) {
    }
    function f1(a13, a14, a15) {
        a13.ab = a14[a15];
        a13 = a14;
        gc();
    }
    f1(v1, v0, 1);
    f(undefined, v1.ab);
}
main();
main();
const v27 = %OptimizeFunctionOnNextCall(main);
main();
