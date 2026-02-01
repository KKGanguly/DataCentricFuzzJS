if (typeof quit === "function") {
    function f4(a5) {
        try {
            quit(a5);
        } catch(e7) {
        }
    }
    v0 = f4;
}
for (let i10 = 48128; i10 < 49152; i10++) {
    const v18 = [];
    const v19 = { type: "function", arguments: v18 };
    let v20;
    try {
        const v25 = new Worker(v0, v19);
        v20 = v25;
    } catch(e26) {
    }
    const v3 = v20;
}
