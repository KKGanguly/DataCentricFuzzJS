function f0() {
}
d8.file.execute("v8/test/mjsunit/wasm/wasm-module-builder.js");
const v6 = new WasmModuleBuilder();
const builder = v6;
builder.addStruct([]);
builder.addStruct([], 0);
builder.addStruct([], 1);
builder.addArray(kWasmI32, true);
builder.addArray(kWasmI32, true);
builder.addArray(kWasmI32, true);
builder.startRecGroup();
builder.addType(makeSig([kWasmI32,kWasmI32,kWasmI32], [kWasmI32]));
builder.endRecGroup();
builder.startRecGroup();
builder.addType(makeSig([], []));
builder.endRecGroup();
builder.startRecGroup();
builder.addType(makeSig([], []));
builder.endRecGroup();
builder.addMemory(16, 32);
builder.addTable(kWasmFuncRef, 3, 3, undefined);
builder.addActiveElementSegment(0, wasmI32Const(0), [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]], kWasmFuncRef);
builder.addTag(makeSig([], []));
const v290 = [kExprLoop,64,kExprLoop,64,kExprI32Const,182,127,kExprI32Popcnt,kExprBlock,126,kExprI64Const,10,kExprEnd,kExprI32Const,170,128,184,183,121,kExprBlock,127,kExprBlock,127,kExprBlock,127,kExprI32Const,237,253,204,145,126,kExprI32Const,242,196,176,214,1,kExprI32Const,198,146,181,197,6,kExprI32LtU,kExprI32Const,140,249,183,155,126,kExprF32Const,63,30,146,74,kExprF32Const,222,125,75,45,kExprF32Ge,kExprI32LtU,kExprLoop,127,kExprI32Const,202,139,247,168,127,kExprEnd,kExprI32Const,170,136,212,35,kExprI32Add,kExprI32LtU,kExprI32LtU,kExprRefFunc,1,kExprCallRef,7,kExprRefNull,112,kGCPrefix,kExprRefCastNull,8,kGCPrefix,kExprRefCastNull,6,kGCPrefix,kExprRefCastNull,7,kExprBrOnNull,3,kExprDrop,kExprI32Const,217,208,213,238,7,kExprI32Add,kExprI32LoadMem8U,0,253,164,2,kAtomicPrefix,kExprI32AtomicSub8U,0,252,220,2,kExprI32Const,141,224,186,176,6,kExprBrTable,1,0,0,kExprEnd,kExprEnd,kExprEnd,kExprI32And,kExprI32Const,245,166,133,143,6,kExprI32Const,180,196,237,219,6,kExprI32Const,0,kAtomicPrefix,kExprI32AtomicCompareExchange16U,0,228,190,1,kExprLocalSet,0,kAtomicPrefix,kExprI32AtomicLoad8U,0,228,123,kExprI64LoadMem16U,0,169,194,2,kExprI64Ne,kAtomicPrefix,kExprI32AtomicLoad,2,231,188,1,kAtomicPrefix,kExprI32AtomicStore8U,0,222,244,2,kExprEnd,kExprEnd,kExprThrow,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI32x4SConvertI16x8High,1,kSimdPrefix,kExprF32x4Neg,1,kSimdPrefix,...kExprI32x4RelaxedTruncF64x2SZero,kSimdPrefix,kExprI8x16Add,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI64x2Ne,1,kSimdPrefix,kExprI8x16MaxS,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprF32x4Pmax,1,kSimdPrefix,kExprI16x8SubSatS,1,kSimdPrefix,kExprI8x16MaxU,kSimdPrefix,kExprI8x16GtS,kSimdPrefix,kExprI32x4ExtractLane,0,kGCPrefix,kExprRefI31,kExprLocalSet,10,kExprRefNull,112,kGCPrefix,kExprRefCast,8,kExprLocalSet,14,kExprI32Const,231,246,180,204,4,kExprI32Const,202,208,208,221,125,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,16,kGCPrefix,kExprStructNew,0,kExprLocalSet,19,kExprI32Const,182,189,251,138,6,kExprI32Const,234,179,189,245,124,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,3,kExprLocalSet,20,kExprI32Const,250,179,170,237,121,kExprI32Const,212,215,247,162,126,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,22,kExprI32Const,148,239,201,238,121,kExprEnd];
const v294 = wasmRefType(4);
const v298 = wasmRefNullType(5);
const v301 = wasmRefType(kWasmArrayRef);
const v304 = wasmRefType(kWasmEqRef);
const v308 = wasmRefNullType(0);
const v311 = wasmRefType(4);
const v315 = wasmRefType(8);
const v318 = wasmRefNullType(kWasmStructRef);
const v321 = wasmRefNullType(kWasmNullFuncRef);
const v326 = wasmRefType(kWasmI31Ref);
const v329 = wasmRefNullType(kWasmNullExternRef);
const v332 = wasmRefNullType(2);
const v339 = wasmRefNullType(kWasmI31Ref);
builder.addFunction(undefined, 6).addLocals(v339, 1).addLocals(kWasmF64, 2).addLocals(kWasmI32, 1).addLocals(kWasmS128, 1).addLocals(v332, 1).addLocals(v329, 1).addLocals(v326, 1).addLocals(kWasmF32, 1).addLocals(v321, 1).addLocals(v318, 1).addLocals(v315, 1).addLocals(kWasmI32, 1).addLocals(v311, 1).addLocals(v308, 1).addLocals(kWasmI32, 1).addLocals(v304, 1).addLocals(v301, 1).addLocals(v298, 1).addLocals(v294, 1).addLocals(kWasmI32, 1).addBodyWithEnd(v290);
const v365 = [kExprEnd];
const v370 = wasmRefNullType(kWasmNullRef);
const v372 = wasmRefNullType(kWasmStructRef);
builder.addFunction(undefined, 7).addLocals(v372, 1).addLocals(v370, 1).addLocals(kWasmF32, 1).addLocals(kWasmEqRef, 1).addLocals(kWasmF64, 1).addBodyWithEnd(v365);
const v419 = [kExprRefFunc,2,kExprLocalSet,0,kExprI32Const,183,242,193,250,122,kNumericPrefix,kExprTableSize,0,kAtomicPrefix,kExprI32AtomicStore16U,1,254,252,1,kNumericPrefix,kExprTableSize,0,kGCPrefix,kExprRefI31,kGCPrefix,kExprRefCastNull,107,kGCPrefix,kExprRefCast,108,kExprLocalSet,1,kGCPrefix,kExprStructNew,0,kExprLocalSet,8,kExprI32Const,200,150,207,158,125,kExprI32Const,240,231,241,136,2,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,5,kExprLocalSet,11,kGCPrefix,kExprStructNew,2,kExprLocalSet,15,kExprEnd];
const v421 = wasmRefNullType(0);
const v426 = wasmRefType(2);
const v428 = wasmRefNullType(kWasmNullRef);
const v432 = wasmRefNullType(6);
const v435 = wasmRefType(5);
const v437 = wasmRefNullType(kWasmNullRef);
const v440 = wasmRefType(kWasmEqRef);
const v443 = wasmRefNullType(2);
const v446 = wasmRefNullType(1);
const v450 = wasmRefNullType(0);
const v453 = wasmRefNullType(1);
const v456 = wasmRefType(kWasmI31Ref);
const v459 = wasmRefType(8);
builder.addFunction(undefined, 8).addLocals(v459, 1).addLocals(v456, 1).addLocals(kWasmF64, 1).addLocals(v453, 1).addLocals(v450, 1).addLocals(kWasmI32, 1).addLocals(v446, 1).addLocals(v443, 1).addLocals(v440, 1).addLocals(kWasmI64, 1).addLocals(v437, 1).addLocals(v435, 1).addLocals(v432, 1).addLocals(kWasmF64, 1).addLocals(v428, 1).addLocals(v426, 1).addLocals(kWasmI64, 1).addLocals(v421, 1).addBodyWithEnd(v419);
builder.addExport("main", 0);
let v486;
try { v486 = builder.instantiate(); } catch (e) {}
const instance = v486;
try {
    const v491 = instance?.exports;
    let v492;
    try { v492 = v491.main(1, 2, 3); } catch (e) {}
    f0(v492);
} catch(e494) {
    try { f0("caught exception", e494); } catch (e) {}
}
