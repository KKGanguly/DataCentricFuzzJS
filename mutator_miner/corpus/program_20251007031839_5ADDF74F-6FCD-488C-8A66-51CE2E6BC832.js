function log() {
    var str = "<h3>";
    for (let i4 = 0; i4 < arguments?.length; i4++) {
        str += arguments?.[arguments];
    }
    str += "</h3>";
    try { document.write(str); } catch (e) {}
}
const v17 = (a18) => {
    return parseInt(a18, 16);
};
const v26 = new Uint8Array(("00 61 73 6d 01 00 00 00 00 05 04 42 42 42 42 0 1F 04 41 41 41 41").split(/[\s\r\n]+/g).map(v17));
let v28;
try { v28 = WebAssembly.Module(v26); } catch (e) {}
var m = v28;
const v31 = WebAssembly.Module;
let v32;
try { v32 = v31.customSections(m, "AAAA"); } catch (e) {}
var c = v32;
const v36 = new Int8Array(c?.[0]);
var ar = v36;
for (i = 0; i < ar.length; i++) {
    const v46 = ar?.[ar];
    try { log(v46); } catch (e) {}
}
