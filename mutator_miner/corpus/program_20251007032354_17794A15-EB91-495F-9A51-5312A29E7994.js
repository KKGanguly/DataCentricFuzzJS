const v15 = new Uint8Array([255,15,66,4,3,5,7,11,86,66,1,2,0]);
const v16 = v15.buffer;
const a = d8.serializer.deserialize(v16);
const v35 = new Uint8Array([255,15,66,4,3,5,7,11,86,66,1,2,1]);
const v36 = v35.buffer;
const v37 = d8.serializer;
let v38;
try { v38 = v37.deserialize(v36); } catch (e) {}
const b = v38;
a.byteLength;
b?.byteLength;
