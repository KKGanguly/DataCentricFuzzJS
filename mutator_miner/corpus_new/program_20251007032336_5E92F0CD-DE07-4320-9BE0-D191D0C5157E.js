function main() {
    function get_thin_string(a2, a3) {
        var str = a2 + a3;
        var o = {};
        o[str];
        return str;
    }
    var str = get_thin_string("foo", "bar");
    function CheckCS() {
        print(("f").charCodeAt(0), str.charCodeAt(0));
    }
    const v21 = %PrepareFunctionForOptimization(CheckCS);
    CheckCS();
    const v23 = %OptimizeFunctionOnNextCall(CheckCS);
    CheckCS();
}
main();
