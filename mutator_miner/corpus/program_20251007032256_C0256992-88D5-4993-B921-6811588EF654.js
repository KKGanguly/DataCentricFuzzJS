function test() {
    const v5 = new ArrayBuffer(50, { maxByteLength: 100 });
    let rb = v5;
    const v8 = new Int8Array(rb);
    let t = v8;
    num2 = {};
    function f12() {
        rb.resize(0);
        return 5;
    }
    num2.valueOf = f12;
    t.lastIndexOf(1, num2);
}
test();
