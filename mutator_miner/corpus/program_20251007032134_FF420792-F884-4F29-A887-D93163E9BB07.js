const v1 = { fetchme: 1234 };
let objX = { objProperty: v1 };
let objY = { doubleProperty: 2130562.5098039214 };
function createArrayWithSlowPutArrayStorage() {
    let protoWithIndexedAccessors = {};
    const v13 = {
        get() {
            return 1337;
        },
    };
    try { Object.defineProperty(protoWithIndexedAccessors, 1337, v13); } catch (e) {}
    function helper(a17) {
        let v19;
        try { v19 = new Array(); } catch (e) {}
        let a = v19;
        if (a17 > 0) {
            try { Object.setPrototypeOf(a, protoWithIndexedAccessors); } catch (e) {}
        }
        return a;
    }
    for (let i25 = 1; i25 < 10000; i25++) {
        try { helper(i25); } catch (e) {}
    }
    let v33;
    try { v33 = helper(0); } catch (e) {}
    return v33;
}
let obj = {};
obj.inlineProperty1 = 1337;
obj.inlineProperty2 = 1338;
obj.oolProperty1 = objX;
let v38;
try { v38 = createArrayWithSlowPutArrayStorage(); } catch (e) {}
let a = v38;
a.index = 42;
a.input = "foobar";
a.groups = obj;
global = a;
global = a;
const v45 = Array?.prototype;
const v49 = {
    get() {
        return 1337;
    },
};
try { Object.defineProperty(v45, 1337, v49); } catch (e) {}
function hax() {
    return global?.groups?.oolProperty1?.objProperty?.fetchme;
}
for (let i59 = 0; i59 < 10000; i59++) {
    try { hax(i59); } catch (e) {}
}
const v66 = /(?<oolProperty1>hax)/;
let v68;
try { v68 = ("hax").match(v66); } catch (e) {}
let match = v68;
const t56 = match?.groups;
t56.oolProperty1 = objY;
global = match;
try { hax(); } catch (e) {}
