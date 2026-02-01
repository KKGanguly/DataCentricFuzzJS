try {
    if (typeof quit === "function") {
        function f4(a5) {
            try {
                try { quit(a5); } catch (e) {}
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
            let v25;
            try { v25 = new Worker(v0, v19); } catch (e) {}
            v20 = v25;
        } catch(e26) {
        }
        const v3 = v20;
    }
} catch(e28) {
}
