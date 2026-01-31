try {
    const v2 = Sandbox?.MemoryView;
    let v5;
    try { v5 = new v2(0, 4294967296); } catch (e) {}
    let v6;
    try { v6 = new DataView(v5); } catch (e) {}
    let sbx_memory = v6;
    const s2 = "asdq";
    let v10;
    try { v10 = Sandbox.getAddressOf(s2); } catch (e) {}
    const addr = v10;
    try { sbx_memory.setUint32(addr, 141, true); } catch (e) {}
    const v16 = addr + 8;
    try { sbx_memory.setUint32(v16, 2147483643, true); } catch (e) {}
    try { ("asdf").localeCompare(s2); } catch (e) {}
} catch(e22) {
}
