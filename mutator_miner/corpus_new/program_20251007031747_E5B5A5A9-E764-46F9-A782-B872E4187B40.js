let v2;
try { v2 = require("inspector"); } catch (e) {}
const inspector = v2;
function post(a5, a6, a7) {
    const v9 = (a10, a11) => {
        const v12 = (a13, a14) => {
            if (a13) {
                let v15;
                try { v15 = a11(a13); } catch (e) {}
                return v15;
            }
            try { a10(a14); } catch (e) {}
        };
        try { a5.post(a6, a7, v12); } catch (e) {}
    };
    let v18;
    try { v18 = new Promise(v9); } catch (e) {}
    return v18;
}
async function main() {
    const v20 = inspector?.Session;
    let v21;
    try { v21 = new v20(); } catch (e) {}
    const session = v21;
    try { session.connect(); } catch (e) {}
    let v25;
    try { v25 = post(session, "HeapProfiler.enable"); } catch (e) {}
    await v25;
    const v29 = { samplingInterval: 32768 };
    let v30;
    try { v30 = post(session, "HeapProfiler.startSampling", v29); } catch (e) {}
    await v30;
    const chunks = [];
    const v35 = (a36) => {
        const v38 = a36?.params?.chunk;
        try { chunks.push(v38); } catch (e) {}
    };
    try { session.on("HeapProfiler.addHeapSnapshotChunk", v35); } catch (e) {}
    const v43 = { reportProgress: false };
    let v44;
    try { v44 = post(session, "HeapProfiler.takeHeapSnapshot", v43); } catch (e) {}
    await v44;
    let v47;
    try { v47 = chunks.join(""); } catch (e) {}
    const snapshot = v47;
    try { console.log(snapshot); } catch (e) {}
}
try { main(); } catch (e) {}
