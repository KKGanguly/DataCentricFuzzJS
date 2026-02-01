function main(a1) {
    class C2 {
        m() {
            return super.length;
        }
    }
    let v9;
    try { v9 = new OfflineAudioContext(1, 38400, 38400); } catch (e) {}
    var node = v9;
    node["a" + a1] = 1;
    if (a1 < (256 - 1)) {
        const v18 = {};
        const t12 = C2?.prototype;
        t12.__proto__ = v18;
    } else {
        const t15 = C2?.prototype;
        t15.__proto__ = node;
    }
    let v21;
    try { v21 = new C2(); } catch (e) {}
    let b = v21;
    b.x0 = 1;
    b.x1 = 2;
    b.x2 = 3;
    b.x3 = 4;
    node?.length;
    let v28;
    try { v28 = b.m(); } catch (e) {}
    try { console.log(v28); } catch (e) {}
}
for (let i32 = 0; i32 < 256; i32++) {
    try { main(i32); } catch (e) {}
}
