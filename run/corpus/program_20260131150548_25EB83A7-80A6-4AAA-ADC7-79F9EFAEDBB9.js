let v2;
try {
    v2 = require("inspector");
} catch(e5) {
}
const inspector = v2;
function post(a8, a9, a10) {
    const v11 = (a12, a13) => {
        const v14 = (a15, a16) => {
            if (a15) {
                let v15;
                try {
                    v15 = a13(a15);
                } catch(e20) {
                }
                return v15;
            }
            try {
                a12(a16);
            } catch(e22) {
            }
        };
        const v12 = v14;
        try {
            a8.post(a9, a10, v12);
        } catch(e25) {
        }
    };
    const v9 = v11;
    let v18;
    try {
        const v30 = new Promise(v9);
        v18 = v30;
    } catch(e31) {
    }
    return v18;
}
async function main() {
    const v20 = inspector?.Session;
    let v21;
    try {
        const v37 = new v20();
        v21 = v37;
    } catch(e38) {
    }
    const session = v21;
    try {
        session.connect();
    } catch(e41) {
    }
    let v25;
    try {
        v25 = post(session, "HeapProfiler.enable");
    } catch(e46) {
    }
    await v25;
    const v29 = { samplingInterval: 32768 };
    let v30;
    try {
        v30 = post(session, "HeapProfiler.startSampling", v29);
    } catch(e55) {
    }
    await v30;
    const chunks = [];
    const v59 = (a60) => {
        const v38 = a60?.params?.chunk;
        try {
            chunks.push(v38);
        } catch(e65) {
        }
    };
    const v35 = v59;
    try {
        session.on("HeapProfiler.addHeapSnapshotChunk", v35);
    } catch(e69) {
    }
    const v43 = { reportProgress: false };
    let v44;
    try {
        v44 = post(session, "HeapProfiler.takeHeapSnapshot", v43);
    } catch(e77) {
    }
    await v44;
    let v47;
    try {
        v47 = chunks.join("");
    } catch(e83) {
    }
    const snapshot = v47;
    try {
        console.log(snapshot);
    } catch(e87) {
    }
}
try {
    main();
} catch(e89) {
}
