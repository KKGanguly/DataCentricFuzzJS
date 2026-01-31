async function f() {
    const v5 = new Uint8Array(65536);
    const v7 = new Int8Array([,...v5]);
    var a = [...v7];
    const v11 = [f];
    function f12() {
    }
    const v14 = undefined?.prototype;
    const v16 = new Proxy(v11, { set: f12, done: v14 });
    var p = v16;
}
f();
f();
