function F0() {
    if (!new.target) { throw 'must be called with new'; }
    this.a = 4;
}
const v3 = new F0();
const v7 = [,1];
const v8 = new Set(v7);
const set = v8;
set.has(undefined);
new F0();
new F0();
[-12530,-2147483649,-9007199254740991,-536870912,-1969038037,16,-4294967297];
[536870889,127,268435441,-1485218147,1156135562,1888263463];
[1356804220,819578445,721146100,512,-832689782];
new Int16Array(8);
new BigInt64Array(3);
function f24() {
}
let v26;
try { v26 = new WasmModuleBuilder(); } catch (e) {}
const builder = v26;
const v29 = WebAssembly?.Table;
const v32 = { element: "anyfunc", initial: 2 };
let v33;
try { v33 = new v29(v32); } catch (e) {}
let table = v33;
try { builder.addImportedTable("m", "table", 4000000000); } catch (e) {}
const v39 = () => {
    const v40 = { table: table };
    const v41 = { m: v40 };
    let v42;
    try { v42 = builder.instantiate(v41); } catch (e) {}
    return v42;
};
const v43 = WebAssembly?.LinkError;
try { f24(v39, v43); } catch (e) {}
new Int8Array(4096);
try {
    function f47() {
    }
    function f49() {
    }
    var kValue = 0.1;
    f49(kValue, v3);
    Debug = debug?.Debug;
    var exception = null;
    function listener(a58, a59, a60, a61) {
        if (a58 != Debug?.DebugEvent?.Exception) {
            return;
        }
        try {
            let v66;
            try { v66 = a59.frame(0); } catch (e) {}
            let v67;
            try { v67 = v66.sourceLineText(); } catch (e) {}
            var line = v67;
            const v69 = /Exception/;
            try { v69.exec("m"); } catch (e) {}
        } catch(e71) {
        }
    }
    let v72 = 1;
    function f73() {
        eval();
        (v72 = 2) == 20;
        return 20;
    }
    const v79 = () => {
        return listener;
    };
    Promise.finally();
    var a = v7;
} catch(e83) {
    async function f84() {
        [,...Uint8Array];
        function f88() {
            return "anyfunc";
        }
        const v90 = { set: f88, done: undefined };
        return f84;
    }
}
