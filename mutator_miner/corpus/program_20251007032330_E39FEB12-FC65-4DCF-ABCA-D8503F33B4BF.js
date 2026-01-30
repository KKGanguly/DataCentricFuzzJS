const v4 = new ArrayBuffer(4, { maxByteLength: 100 });
const ab = v4;
const v7 = new Int8Array(ab);
const ta = v7;
const v12 = new ArrayBuffer(864, { maxByteLength: 2000 });
const rab = v12;
const v14 = new Int8Array(rab);
const lengthTracking = v14;
rab.resize(0);
function f18() {
    return lengthTracking;
}
const v20 = Symbol.species;
ta.constructor = { [v20]: f18 };
const v22 = () => {
    return true;
};
try { ta.filter(v22); } catch (e) {}
