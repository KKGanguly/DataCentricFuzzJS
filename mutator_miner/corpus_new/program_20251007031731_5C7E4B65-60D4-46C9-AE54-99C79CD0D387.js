function f0() {
}
const v47 = new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,127,3,2,1,0,7,8,1,4,109,97,105,110,0,0,10,13,1,11,0,210,0,209,4,64,5,11,65,42,11]);
let raw = v47;
let buff = raw.buffer;
const t5 = WebAssembly.Module;
const v53 = new t5(buff);
let mod = v53;
const t8 = WebAssembly.Instance;
const v56 = new t8(mod);
let inst = v56;
let result = inst.exports.main();
f0(42, result);
