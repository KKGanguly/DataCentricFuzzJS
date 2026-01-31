try { importScripts("load_wasm.js"); } catch (e) {}
try { importScripts("wasm_indexeddb_test.js"); } catch (e) {}
function f5(a6) {
    if (a6?.data?.command === "load") {
        const v11 = (a12) => {
            if (a12 === 2) {
                try { postMessage("ok"); } catch (e) {}
            } else {
                try { postMessage("error"); } catch (e) {}
            }
        };
        const v21 = (a22) => {
            let v24;
            try { v24 = postMessage(a22); } catch (e) {}
            return v24;
        };
        const v26 = a6?.data?.db_name;
        let v28;
        try { v28 = loadFromIndexedDB(v26); } catch (e) {}
        try { v28.then(v11, v21); } catch (e) {}
    } else {
        if (a6?.data?.command === "save") {
            const v34 = (a35) => {
                try { postMessage("ok"); } catch (e) {}
            };
            const v39 = () => {
                let v42;
                try { v42 = postMessage("error"); } catch (e) {}
                return v42;
            };
            const v44 = a6?.data?.db_name;
            let v46;
            try { v46 = createAndSaveToIndexedDB(v44); } catch (e) {}
            try { v46.then(v34, v39); } catch (e) {}
        } else {
            const v50 = "unknown message: " + a6?.data;
            try { postMessage(v50); } catch (e) {}
        }
    }
}
onmessage = f5;
