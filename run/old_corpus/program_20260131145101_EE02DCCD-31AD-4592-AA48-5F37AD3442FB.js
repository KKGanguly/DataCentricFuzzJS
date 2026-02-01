async function f() {
    const v3 = new Uint8Array(65536);
    const v5 = v3;
    const v8 = new Int8Array([,...v5]);
    const v7 = v8;
    var a = [...v7];
    const v11 = [f];
    function f12() {
    }
    const v14 = undefined?.prototype;
    const v20 = new Proxy(v11, { set: f12, done: v14 });
    const v16 = v20;
    var p = v16;
}
f();
f();
