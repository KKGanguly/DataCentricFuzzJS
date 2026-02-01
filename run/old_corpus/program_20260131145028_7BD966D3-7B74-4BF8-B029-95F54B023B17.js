try {
    const v2 = Sandbox?.MemoryView;
    let v5;
    try {
        const v7 = new v2(0, 4294967296);
        v5 = v7;
    } catch(e8) {
    }
    let v6;
    try {
        const v12 = new DataView(v5);
        v6 = v12;
    } catch(e13) {
    }
    let sbx_memory = v6;
    const s2 = "asdq";
    let v10;
    try {
        v10 = Sandbox.getAddressOf(s2);
    } catch(e20) {
    }
    const addr = v10;
    try {
        sbx_memory.setUint32(addr, 141, true);
    } catch(e25) {
    }
    const v16 = addr + 8;
    try {
        sbx_memory.setUint32(v16, 2147483643, true);
    } catch(e32) {
    }
    try {
        ("asdf").localeCompare(s2);
    } catch(e35) {
    }
} catch(e36) {
}
