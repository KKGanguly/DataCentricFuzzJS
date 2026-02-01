const t0 = "HBs1";
t0[65536] = 0;
gc({ execution: "async", type: "minor" });
const v9 = new Uint8Array();
const v8 = v9;
var instance = v8;
instance.constructor = {};
