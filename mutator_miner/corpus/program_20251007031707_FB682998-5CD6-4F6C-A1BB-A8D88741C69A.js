try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new Binary(); } catch (e) {}
    let binary = v4;
    try { binary.emit_header(); } catch (e) {}
    const v13 = [kTypeSectionCode,4,1,kWasmFunctionTypeForm,0,0];
    try { binary.emit_bytes(v13); } catch (e) {}
    const v19 = [kFunctionSectionCode,2,1,0];
    try { binary.emit_bytes(v19); } catch (e) {}
    const v25 = [kCodeSectionCode,6,1,4];
    try { binary.emit_bytes(v25); } catch (e) {}
    const v31 = [kUnknownSectionCode,2,1,0];
    try { binary.emit_bytes(v31); } catch (e) {}
    const v36 = [kUnknownSectionCode,2,1,0];
    try { binary.emit_bytes(v36); } catch (e) {}
    const v41 = [kUnknownSectionCode,2,1,0];
    try { binary.emit_bytes(v41); } catch (e) {}
    const v44 = [kExprEnd];
    try { binary.emit_bytes(v44); } catch (e) {}
    let v46;
    try { v46 = binary.trunc_buffer(); } catch (e) {}
    let buffer = v46;
    try { WebAssembly.compile(buffer); } catch (e) {}
} catch(e50) {
}
