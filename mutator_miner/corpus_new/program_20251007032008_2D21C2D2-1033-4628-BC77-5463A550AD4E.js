function f0() {
}
function f1() {
}
var boundFunction = f1.bind();
const v5 = new Uint8Array();
var instance = v5;
const v8 = Symbol.species;
instance.constructor = { [v8]: boundFunction };
const v10 = () => {
    const v11 = (a12) => {
        return a12 * 2;
    };
    return instance.map(v11);
};
f0(v10, TypeError);
