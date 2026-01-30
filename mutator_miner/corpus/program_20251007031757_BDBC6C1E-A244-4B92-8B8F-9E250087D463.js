function poc() {
    const x = "asdf";
    for (let i4 = 0; i4 < 2; i4++) {
        function v8() {
            let v13 = 0;
            do {
                v13++;
            } while (v13 < 1200000)
        }
        const v15 = v8();
        for (let i19 = 0; i19 < 100000; i19++) {
            if (x) {
            } else {
                const v26 = { get: v8 };
                for (let i28 = 0; i28 < 1000; i28++) {
                }
            }
        }
    }
}
poc();
