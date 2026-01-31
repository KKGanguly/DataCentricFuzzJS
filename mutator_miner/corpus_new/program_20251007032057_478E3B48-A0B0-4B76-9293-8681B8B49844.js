const v4 = new Array(1, 2, 3);
var d = v4;
class C6 {
    constructor() {
        return d;
    }
}
function f8(a9, a10) {
    if (a10 == "length") {
        return 256;
    }
    const v15 = Symbol.species;
    return { [v15]: C6 };
}
function f17(a18, a19) {
    return true;
}
var handler = { get: f8, has: f17 };
const v25 = new Proxy([], handler);
var p = v25;
const v30 = new Array(1, 2, 3);
var a = v30;
function test() {
    return 131354989131639;
}
var o = a.map.call(p, test);
