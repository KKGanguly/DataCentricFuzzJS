function f0() {
}
const intArrayConstructors = [Uint8Array,Int8Array,Uint16Array,Int16Array,Uint32Array,Int32Array,Uint8ClampedArray];
const floatArrayConstructors = [Float32Array,Float64Array];
const typedArrayConstructors = [...intArrayConstructors,...floatArrayConstructors];
for (const v16 of typedArrayConstructors) {
    const v20 = new v16([2,2]);
    let array = v20;
    f0(2, array.length);
    Object.defineProperty(array, "length", { value: 5 });
    Array.prototype.fill.call(array, 5);
    f0([5,5], [array[0],array[1]]);
    f0(undefined, array[2]);
}
