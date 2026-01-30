try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v6;
try { v6 = new WasmModuleBuilder(); } catch (e) {}
var builder = v6;
const v8 = [];
let v11;
try { v11 = builder.addFunction("f0", kSig_v_v); } catch (e) {}
try { v11.addBody(v8); } catch (e) {}
const v13 = [];
let v15;
try { v15 = builder.addFunction("f1", kSig_v_v); } catch (e) {}
try { v15.addBody(v13); } catch (e) {}
try { builder.instantiate(); } catch (e) {}
