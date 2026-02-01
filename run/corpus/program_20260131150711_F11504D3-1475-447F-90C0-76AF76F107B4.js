try {
    let v2;
    try {
        let v4;
        try { v4 = require("inspector"); } catch (e) {}
        v2 = v4;
    } catch(e5) {
    }
    const inspector = v2;
    function post(a8, a9, a10) {
        const v11 = (a12, a13) => {
            const v14 = (a15, a16) => {
                if (a15) {
                    let v15;
                    try {
                        let v19;
                        try { v19 = a13(a15); } catch (e) {}
                        v15 = v19;
                    } catch(e20) {
                    }
                    return v15;
                }
                try {
                    try { a12(a16); } catch (e) {}
                } catch(e22) {
                }
            };
            const v12 = v14;
            try {
                try { a8.post(a9, a10, v12); } catch (e) {}
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
            let v37;
            try { v37 = new v20(); } catch (e) {}
            v21 = v37;
        } catch(e38) {
        }
        const session = v21;
        try {
            try { session.connect(); } catch (e) {}
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
            let v54;
            try { v54 = post(session, "HeapProfiler.startSampling", v29); } catch (e) {}
            v30 = v54;
        } catch(e55) {
        }
        await v30;
        const chunks = [];
        const v59 = (a60) => {
            const v38 = a60?.params?.chunk;
            try {
                try { chunks.push(v38); } catch (e) {}
            } catch(e65) {
            }
        };
        const v35 = v59;
        try {
            try { session.on("HeapProfiler.addHeapSnapshotChunk", v35); } catch (e) {}
        } catch(e69) {
        }
        const v43 = { reportProgress: false };
        let v44;
        try {
            let v76;
            try { v76 = post(session, "HeapProfiler.takeHeapSnapshot", v43); } catch (e) {}
            v44 = v76;
        } catch(e77) {
        }
        await v44;
        let v47;
        try {
            let v82;
            try { v82 = chunks.join(""); } catch (e) {}
            v47 = v82;
        } catch(e83) {
        }
        const snapshot = v47;
        try {
            try { console.log(snapshot); } catch (e) {}
        } catch(e87) {
        }
    }
    try {
        main();
    } catch(e89) {
    }
} catch(e90) {
}
