const o1 = { valueOf: 1337 };
let v6;
try { v6 = Array(BigInt64Array, o1, ..."short", o1); } catch (e) {}
const o2 = v6;
const o3 = { __proto__: 13.37, c: o2, e: "国务院关于《土地" };
const o4 = JSON.stringify(o3);
const v16 = Temporal.Calendar;
try { new v16(o4); } catch (e) {}
