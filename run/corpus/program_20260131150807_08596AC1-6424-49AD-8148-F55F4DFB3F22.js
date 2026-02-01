try {
    function f0() {
    }
    function gc() {
        for (let i3 = 0; i3 < 10; i3++) {
            const v15 = new ArrayBuffer((1024 * 1024) * 10);
            const v14 = v15;
            let ab = v14;
        }
    }
    function opt(a19) {
        for (let i21 = 0; i21 < 500; i21++) {
        }
        let tmp = { a: 1 };
        gc();
        const v31 = {};
        tmp.__proto__ = tmp;
        for (const v32 in tmp) {
            const v33 = {};
            tmp.__proto__ = tmp;
            gc();
            const v35 = {};
            a19.__proto__ = a19;
            return a19[a19];
        }
    }
    opt({});
    const v41 = new Uint32Array(100);
    const v39 = v41;
    let fake_object_memory = v39;
    fake_object_memory[0] = 4660;
    let fake_object = opt(fake_object_memory);
    f0(fake_object);
} catch(e48) {
}
