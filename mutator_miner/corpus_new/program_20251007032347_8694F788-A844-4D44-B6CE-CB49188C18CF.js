function f0() {
}
const v3 = d8.file;
try { v3.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function MultiResultTest() {
    f0("MultiResultTest");
    let v9;
    try { v9 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v9;
    let v12;
    try { v12 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v12;
    let v15;
    try { v15 = builder.addType(kSig_iii_ii); } catch (e) {}
    let sig_iii_ii = v15;
    let v18;
    try { v18 = builder.addTag(kSig_v_v); } catch (e) {}
    let except = v18;
    const v33 = [kExprBlock,kWasmVoid,kExprLocalGet,0,kExprBrIf,0,kExprThrow,except,kExprEnd,kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprLocalGet,1,kExprI32Sub];
    let v35;
    try { v35 = builder.addFunction("callee", kSig_iii_ii); } catch (e) {}
    try { v35.addBody(v33); } catch (e) {}
    const v49 = [kExprTry,kWasmVoid,kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0,kExprI32Mul,kExprI32Add,kExprReturn,kExprCatch,except,kExprEnd,kExprI32Const,12];
    let v51;
    try { v51 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v52;
    try { v52 = v51.addBody(v49); } catch (e) {}
    try { v52.exportAs("main"); } catch (e) {}
    const v55 = WebAssembly?.Module;
    let v56;
    try { v56 = builder.toBuffer(); } catch (e) {}
    let v57;
    try { v57 = new v55(v56); } catch (e) {}
    let module = v57;
    const v59 = WebAssembly?.Instance;
    let v60;
    try { v60 = new v59(module); } catch (e) {}
    let instance = v60;
    const v64 = instance?.exports;
    let v65;
    try { v65 = v64.main(0, 2); } catch (e) {}
    try { f0(v65); } catch (e) {}
    const v69 = instance?.exports;
    let v70;
    try { v70 = v69.main(3, 5); } catch (e) {}
    try { f0(v70); } catch (e) {}
}
try { MultiResultTest(); } catch (e) {}
