function f0() {
}
function f1() {
    const v3 = WebAssembly.Memory;
    const v10 = ((64 * 1024) * 1024) / 65536;
    const v12 = new v3({ initial: v10 });
    var memory = v12;
    const v16 = new Uint8Array(memory.buffer);
    var array = v16;
    function f18() {
        return array;
    }
    const v22 = {
        valueOf() {
            memory.grow(1);
        },
    };
    Uint8Array.of.call(f18, v22);
}
f0(f1, TypeError);
function f27() {
    const v29 = WebAssembly.Memory;
    const v36 = ((64 * 1024) * 1024) / 65536;
    const v38 = new v29({ initial: v36 });
    var memory = v38;
    const v42 = new Uint8Array(memory.buffer);
    var array = v42;
    function f44() {
        return array;
    }
    const v48 = {
        valueOf() {
            memory.grow(1);
        },
    };
    const v49 = [v48];
    const v50 = (a51) => {
        return a51;
    };
    Uint8Array.from.call(f44, v49, v50);
}
f0(f27, TypeError);
