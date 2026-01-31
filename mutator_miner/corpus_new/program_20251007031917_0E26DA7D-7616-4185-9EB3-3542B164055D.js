const v2 = new SharedArrayBuffer(65536);
var s = v2;
const v5 = new Uint32Array(s);
var u = v5;
Atomics.store(u, 0, 1234);
