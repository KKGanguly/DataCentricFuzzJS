function f0() {
}
const v3 = Symbol.species;
Object.defineProperty(Promise, v3, { value: 0 });
function f8() {
}
const v10 = new Promise(f8);
const v9 = v10;
var p = v9;
try {
    p.then();
    f0();
} catch(e15) {
    f0(e15 instanceof TypeError);
}
