function f0() {
}
const v2 = WebAssembly.Table;
const v6 = new v2({ element: "anyfunc", initial: 1 });
let table = v6;
const v8 = () => {
    return table.get(3612882876);
};
f0(v8, RangeError);
