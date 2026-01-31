if (typeof quit === "function") {
    function f4(a5) {
        try { quit(a5); } catch (e) {}
    }
    v0 = f4;
}
for (let i9 = 48128; i9 < 49152; i9++) {
    const v18 = [];
    const v19 = { type: "function", arguments: v18 };
    let v20;
    try { v20 = new Worker(v0, v19); } catch (e) {}
    const v3 = v20;
}
