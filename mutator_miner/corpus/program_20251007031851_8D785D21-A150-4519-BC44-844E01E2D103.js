function f0() {
}
const v5 = new ArrayBuffer(1024 * 1024);
var buffer = v5;
function f8() {
}
const v9 = (a10) => {
    const v11 = %ArrayBufferNeuter(buffer);
};
const v13 = new Proxy(f8, { get: v9 });
const v15 = Symbol.species;
buffer.constructor = { [v15]: v13 };
const v20 = new Uint8Array(buffer, 0, 1024);
var array1 = v20;
const v22 = () => {
    const v23 = new Uint8Array(array1);
    return v23;
};
f0(v22);
const v25 = () => {
    const v27 = new Int8Array(array1);
    return v27;
};
f0(v25);
