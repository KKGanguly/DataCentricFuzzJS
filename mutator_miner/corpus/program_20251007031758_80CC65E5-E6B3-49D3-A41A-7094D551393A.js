function funcify(a1) {
    var type = typeof a1;
    if (type === "object") {
        var funcified = {};
        var foo = {};
        for (const v10 in a1) {
            funcified[v10] = funcify(a1[v10]);
            foo[v10] = true;
        }
        return funcified;
    } else {
        if (type === "function") {
            return a1;
        } else {
            function f16() {
                return a1;
            }
            return f16;
        }
    }
}
var obj = {};
obj.A = 1;
function f20() {
    return 2;
}
obj.B = f20;
obj.C = 3;
obj.D = 4;
var funcified = funcify(obj);
console.assert(typeof funcified.A === "function", "A is a function");
console.assert(funcified.A() === 1, "The value of A() is 1");
console.assert(typeof funcified.B === "function", "B is a function");
console.assert(funcified.B() === 2, "The value of B() is 2.  Actual value is: " + funcified.B());
console.assert(typeof funcified.C === "function", "C is a function. Actual value is: " + funcified.C);
console.assert(typeof funcified.D === "function", "D is a function");
console.assert(funcified.D() === 4, "The value of D() is 4");
