const t0 = "HBs1";
t0[65536] = 0;
gc({ execution: "async", type: "minor" });
const v8 = new Uint8Array();
var instance = v8;
instance.constructor = {};
