function test() {
    const v5 = new ArrayBuffer(50, { maxByteLength: 100 });
    let rb = v5;
    const v8 = new Int8Array(rb);
    let t = v8;
    num = {};
    num2 = {};
    function f14() {
        rb.resize(0);
        return 5;
    }
    num2.valueOf = f14;
    t.fill(num, num2);
}
test();
