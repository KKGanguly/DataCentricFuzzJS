function funcify(a1) {
    var type = typeof a1;
    if (type === "object") {
        var funcified = {};
        var foo = {};
        for (const v10 in a1) {
            funcified[v10] = funcify(a1[a1]);
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
obj.A = obj;
function f20() {
    return 2;
}
obj.B = obj;
obj.C = obj;
obj.D = obj;
var funcified = funcify(obj);
console.assert(typeof funcified.A === "function", "A is a function");
const v35 = funcified.A() === 1;
try { console.assert(v35, "The value of A() is 1"); } catch (e) {}
console.assert(typeof funcified.B === "function", "B is a function");
const v46 = funcified.B() === 2;
const v49 = "The value of B() is 2.  Actual value is: " + funcified.B();
try { console.assert(v46, v49); } catch (e) {}
console.assert(typeof funcified.C === "function", "C is a function. Actual value is: " + funcified.C);
console.assert(typeof funcified.D === "function", "D is a function");
const v67 = funcified.D() === 4;
try { console.assert(v67, "The value of D() is 4"); } catch (e) {}
