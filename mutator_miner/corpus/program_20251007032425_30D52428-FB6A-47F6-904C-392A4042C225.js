function classOf(a1) {
    var string = Object.prototype.toString.call(a1);
    return string.substring(8, string.length - 1);
}
function deepObjectEquals(a13, a14) {
    var aProps = Object.keys(a13);
    aProps.sort();
    var bProps = Object.keys(a14);
    bProps.sort();
    if (!deepEquals(aProps, bProps)) {
        return false;
    }
    for (let i27 = 0; i27 < aProps.length; i27++) {
        if (!deepEquals(a13[aProps[i27]], a14[aProps[i27]])) {
            return false;
        }
    }
    return true;
}
function deepEquals(a42, a43) {
    if (a42 === a43) {
        if (a42 === 0) {
            return (1 / a42) === (1 / a43);
        }
        return true;
    }
    if (typeof a42 != typeof a43) {
        return false;
    }
    if (typeof a42 == "number") {
        return (isNaN(a42) && isNaN(a43)) || (a42 === a43);
    }
    if (((typeof a42 !== "object") && (typeof a42 !== "function")) && (typeof a42 !== "symbol")) {
        return false;
    }
    var objectClass = classOf(a42);
    if (objectClass === "Array") {
        if (a42.length != a43.length) {
            return false;
        }
        for (let i87 = 0; i87 < a42.length; i87++) {
            if (!deepEquals(a42[i87], a43[i87])) {
                return false;
            }
        }
        return true;
    }
    if (objectClass !== classOf(a43)) {
        return false;
    }
    if (objectClass === "RegExp") {
        return a42.toString() === a43.toString();
    }
    if (objectClass === "Function") {
        return true;
    }
    if ((((objectClass == "String") || (objectClass == "Number")) || (objectClass == "Boolean")) || (objectClass == "Date")) {
        if (a42.valueOf() !== a43.valueOf()) {
            return false;
        }
    }
    return deepObjectEquals(a42, a43);
}
function opt(a127) {
    const v0 = [];
    let v1 = Infinity;
    const v2 = v1.E;
    for (const v134 in v1) {
        v2.valueOf = v134;
    }
    for (let i137 = -1; i137 > v0; i137 = i137 & -1) {
        for (let i144 = i137; i144 <= -1; i144 = i144 + v2) {
            const v7 = v1++;
            const v8 = -i137;
            for (let i155 = i144; i155 <= v7; i155 = i155 + i137) {
            }
        }
    }
    return v2;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v168 = %PrepareFunctionForOptimization(opt);
let jit_a1 = opt(true);
const v172 = %OptimizeFunctionOnNextCall(opt);
let jit_a2 = opt(false);
if ((jit_a0 === undefined) && (jit_a2 === undefined)) {
    opt(true);
} else {
    if ((jit_a0_0 === jit_a0) && !deepEquals(jit_a0, jit_a2)) {
        fuzzilli("FUZZILLI_CRASH", 0);
    }
}
