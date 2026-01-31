function F0() {
    if (!new.target) { throw 'must be called with new'; }
    this.a = 4;
    for (let v3 = 0; v3 < 32; v3++) {
        this["p" + v3] = v3;
    }
}
new F0();
new F0();
new F0();
const v10 = [-12530,-2147483649,-9007199254740991,-536870912,-1969038037,16,-4294967297];
[536870889,127,268435441,-1485218147,1156135562,1888263463];
[1356804220,819578445,721146100,512,-832689782];
new Int16Array(8);
new BigInt64Array(3);
for (const v20 in v10) {
    [105.30743816839777,1000000000.0,317.41978578184035,1.3383740439112272e+308,0.0,178706.93552470068,5.0,-3.0845262845167675e+307,675710.7575252817];
    [1.1094685244485443e+308];
    [-0.4560477845997628,-794657.1272113402,1.0,0.5142928741019991,-177362.05131316837,-6.00943703667669,-0.0,Infinity,NaN];
}
new Int8Array(4096);
try {
    Debug = debug;
    let v28 = null;
    function listener(a30, a31, a32, a33) {
        const v35 = Debug.DebugEvent;
        if (a30 != v35.Exception) {
            return;
        }
        try {
            v35[3978] = debug;
            const v39 = %WasmStruct();
            let v40;
            try { v40 = a31.frame(0); } catch (e) {}
            let v41;
            try { v41 = v40.sourceLineText(); } catch (e) {}
            var line = v41;
            var match = /Exception/.exec(line);
        } catch(e48) {
            v28 = e48;
        }
    }
    try { Debug.setListener(listener); } catch (e) {}
    Debug.setBreakOnException();
    var thenable = {};
    const v54 = () => {
        return thenable;
    };
    const v56 = Promise.reject();
    try { v56.finally(v54); } catch (e) {}
} catch(e58) {
}
