function create_asmjs_module(a1, a2, a3) {
    'use asm';
    const v4 = a1?.Int32Array;
    let v5;
    try { v5 = new v4(a3); } catch (e) {}
    var i32 = v5;
    function foo() {
        return 0;
    }
    return { foo: foo };
}
const v13 = 4 * 1024;
let v14;
try { v14 = new ArrayBuffer(v13); } catch (e) {}
buffer = v14;
const v22 = {
    buffer: buffer,
    get create_asm_js() {
        const v19 = {};
        let v20;
        try { v20 = create_asmjs_module(window, v19, buffer); } catch (e) {}
        asmjs_module = v20;
    },
};
to_transfer = v22;
const v27 = [`\n  onmessage = e => {\n    let buffer = e.data.buffer;\n    let array = new Float32Array(buffer);\n    while (true)\n      array.sort();\n  }\n`];
let v28;
try { v28 = new Blob(v27); } catch (e) {}
let v30;
try { v30 = URL.createObjectURL(v28); } catch (e) {}
let v31;
try { v31 = new Worker(v30); } catch (e) {}
worker = v31;
const v34 = [buffer];
try { worker.postMessage(to_transfer, v34); } catch (e) {}
let v38;
try { v38 = new Float32Array(buffer); } catch (e) {}
let array = v38;
const v40 = () => {
    let v42;
    try { v42 = Math.random(); } catch (e) {}
    let v43;
    try { v43 = array.fill(v42); } catch (e) {}
    return v43;
};
try { setInterval(v40, 0); } catch (e) {}
