const v2 = new Uint8ClampedArray(257);
v2[34] = v2;
const v5 = {};
v5.writable = v5;
Object.defineProperty(Function, "length", v5);
