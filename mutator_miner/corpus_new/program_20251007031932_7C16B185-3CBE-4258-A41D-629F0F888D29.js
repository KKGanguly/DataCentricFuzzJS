function f0() {
}
const wasmMagic = [0,97,115,109];
const version = [1,0,0,0];
const i32const = 65;
const i64const = 66;
const arrayNewWithRTT = [251,17];
const arrayGet = [251,19];
const rttCanon = [251,48];
const functionKind = 0;
const typeSection = 1;
const importSection = 2;
const functionSection = 3;
const exportSection = 7;
const codeSection = 10;
const functionType = 96;
const arrayType = 94;
const i64Type = 126;
function f47() {
    let res = [this.length];
    for (let i53 = 0; i53 < this.length; i53++) {
        res.push(this.charCodeAt(i53));
    }
    return res;
}
const t25 = String.prototype;
t25.wasmBytes = f47;
const functions = [{ name: "run", index: 0 }];
function leb(a71) {
    let bytes = [];
    while (a71 != 0) {
        let byte = a71 & 127;
        if (a71 >>= 7) {
            byte |= 128;
        }
        bytes.push(byte);
    }
    return bytes;
}
const code = [i64const,0,i32const,...leb(1073758207),...rttCanon,1,...arrayNewWithRTT,1,i32const,...leb(825307441 / 8),...arrayGet,1];
const moduleBytes = [];
try { moduleBytes.push(...wasmMagic); } catch (e) {}
try { moduleBytes.push(...version); } catch (e) {}
const types = [[functionType,0,1,i64Type],[arrayType,i64Type,1]];
const v106 = (a107, a108) => {
    return a107 + a108.length;
};
const typesSectionLength = 1 + types.reduce(v106, 0);
const v116 = [typeSection,typesSectionLength,types.length];
try { moduleBytes.push(...v116); } catch (e) {}
for (const v118 of types) {
    try { moduleBytes.push(...v118); } catch (e) {}
}
const v132 = [importSection,15,1,...("env").wasmBytes(),...("mem").wasmBytes(),2,1,128,64,128,64];
try { moduleBytes.push(...v132); } catch (e) {}
const v137 = [functionSection,2,1,0];
try { moduleBytes.push(...v137); } catch (e) {}
const functionBytes = [];
for (const v141 of functions) {
    functionBytes.push([...v141.name.wasmBytes(),functionKind,v141.index]);
}
const v148 = (a149, a150) => {
    return a149 + a150.length;
};
const exportSectionLength = 1 + functionBytes.reduce(v148, 0);
const v158 = [exportSection,exportSectionLength,functions.length];
try { moduleBytes.push(...v158); } catch (e) {}
for (const v160 of functionBytes) {
    try { moduleBytes.push(...v160); } catch (e) {}
}
const locals = [0];
moduleBytes.push(codeSection);
moduleBytes.push((code.length + locals.length) + 3);
moduleBytes.push(1);
moduleBytes.push((code.length + locals.length) + 1);
try { moduleBytes.push(...locals); } catch (e) {}
try { moduleBytes.push(...code); } catch (e) {}
moduleBytes.push(11);
const v185 = WebAssembly.Memory;
const v189 = new v185({ initial: 8192, maximum: 8192 });
const mem = v189;
const v191 = WebAssembly.Instance;
const v192 = WebAssembly.Module;
const v194 = new Uint8Array(moduleBytes);
let v195;
try { v195 = new v192(v194); } catch (e) {}
const v196 = { mem: mem };
const v197 = { env: v196 };
let v198;
try { v198 = new v191(v195, v197); } catch (e) {}
const wasm = v198;
f0("running");
const v203 = wasm?.exports;
let v204;
try { v204 = v203.run(); } catch (e) {}
let v205;
try { v205 = v204.toString(16); } catch (e) {}
f0(v205);
f0("done");
