try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v6;
try { v6 = new Binary(); } catch (e) {}
let binary = v6;
try { binary.emit_header(); } catch (e) {}
const v10 = (a11) => {
    try { a11.emit_u32v(1); } catch (e) {}
    try { a11.emit_u8(kWasmFunctionTypeForm); } catch (e) {}
    try { a11.emit_u32v(0); } catch (e) {}
    try { a11.emit_u32v(0); } catch (e) {}
};
try { binary.emit_section(kTypeSectionCode, v10); } catch (e) {}
const v22 = (a23) => {
    try { a23.emit_u32v(1); } catch (e) {}
    try { a23.emit_u32v(0); } catch (e) {}
};
try { binary.emit_section(kFunctionSectionCode, v22); } catch (e) {}
try { binary.emit_u8(kCodeSectionCode); } catch (e) {}
try { binary.emit_u8(2); } catch (e) {}
try { binary.emit_u8(1); } catch (e) {}
try { binary.emit_u8(64); } catch (e) {}
const v38 = binary?.length;
let v39;
try { v39 = new ArrayBuffer(v38); } catch (e) {}
let buffer = v39;
let v42;
try { v42 = new Uint8Array(buffer); } catch (e) {}
let view = v42;
for (let i45 = 0; i45 < binary?.length; i45++) {
    view[i45] = binary?.[i45] | 0;
}
try { WebAssembly.validate(buffer); } catch (e) {}
