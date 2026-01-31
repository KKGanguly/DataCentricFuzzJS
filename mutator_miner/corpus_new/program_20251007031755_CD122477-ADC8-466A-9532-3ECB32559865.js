const v1 = new WeakSet();
const set = v1;
const obj = {};
gc();
gc();
const v10 = new Int8Array(251658240);
const foo = v10;
set.add(obj);
