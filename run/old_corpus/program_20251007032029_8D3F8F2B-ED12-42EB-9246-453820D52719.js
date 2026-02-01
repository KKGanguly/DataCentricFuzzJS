try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
const kNopForTestingUnsupportedInLiftoff = 22;
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(1, 1, false); } catch (e) {}
    const v14 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try { v17 = makeSig(v14, v15); } catch (e) {}
    let v18;
    try { v18 = builder.addType(v17); } catch (e) {}
    var sig_index = v18;
    let v22;
    try { v22 = builder.addFunction("zero", kSig_i_i); } catch (e) {}
    var zero = v22;
    let v25;
    try { v25 = builder.addFunction("one", sig_index); } catch (e) {}
    var one = v25;
    let v28;
    try { v28 = builder.addFunction("two", kSig_i_i); } catch (e) {}
    var two = v28;
    const v35 = [kExprLocalGet,0,kExprI32LoadMem,0,0];
    try { zero.addBody(v35); } catch (e) {}
    const v40 = [kNopForTestingUnsupportedInLiftoff,kExprLocalGet,7,kExprCallFunction,zero?.index];
    try { one.addBody(v40); } catch (e) {}
    const v61 = [kExprLocalGet,0,kExprI32Const,1,kExprI32Add,kExprLocalGet,0,kExprI32Const,2,kExprI32Add,kExprLocalGet,0,kExprI32Const,3,kExprI32Add,kExprLocalGet,0,kExprI32Const,4,kExprI32Add,kExprLocalGet,0,kExprI32Const,5,kExprI32Add,kExprLocalGet,0,kExprI32Const,6,kExprI32Add,kExprLocalGet,0,kExprI32Const,7,kExprI32Add,kExprLocalGet,0,kExprI32Const,8,kExprI32Add,kExprCallFunction,one?.index];
    let v62;
    try { v62 = two.addBody(v61); } catch (e) {}
    try { v62.exportFunc(); } catch (e) {}
    const v64 = {};
    let v65;
    try { v65 = builder.instantiate(v64); } catch (e) {}
    return v65;
}
let v66;
try { v66 = f5(); } catch (e) {}
var instance = v66;
const v69 = instance?.exports;
let v70;
try { v70 = v69.two(34); } catch (e) {}
console.log(v70);
