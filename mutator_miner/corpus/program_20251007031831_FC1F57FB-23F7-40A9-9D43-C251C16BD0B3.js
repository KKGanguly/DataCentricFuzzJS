try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    try { builder.addMemory(1, 1); } catch (e) {}
    const v18 = [kExprGetLocal,0,kExprI32Const,0,kExprI32StoreMem,0,0];
    let v21;
    try { v21 = builder.addFunction(undefined, kSig_v_i); } catch (e) {}
    try { v21.addBody(v18); } catch (e) {}
    const v26 = [kExprGetLocal,5,kExprCallFunction,0];
    let v31;
    try { v31 = new Array(6); } catch (e) {}
    let v32;
    try { v32 = v31.fill(kWasmI32); } catch (e) {}
    const v33 = [];
    let v35;
    try { v35 = makeSig(v32, v33); } catch (e) {}
    let v36;
    try { v36 = builder.addFunction(undefined, v35); } catch (e) {}
    try { v36.addBody(v26); } catch (e) {}
    const gen_i32_code = [kExprTeeLocal,0,kExprGetLocal,0,kExprI32Const,1,kExprI32Add];
    let v48;
    try { v48 = wasmI32Const(0); } catch (e) {}
    let v50;
    try { v50 = wasmI32Const(1); } catch (e) {}
    const v53 = [...v48,...v50,kExprI32Add,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprCallFunction,1];
    const v55 = { i32_count: 1 };
    let v58;
    try { v58 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    let v59;
    try { v59 = v58.addLocals(v55); } catch (e) {}
    let v60;
    try { v60 = v59.addBody(v53); } catch (e) {}
    try { v60.exportAs("three"); } catch (e) {}
    let v62;
    try { v62 = builder.instantiate(); } catch (e) {}
    const instance = v62;
    const v64 = instance?.exports;
    try { v64.three(); } catch (e) {}
} catch(e66) {
}
