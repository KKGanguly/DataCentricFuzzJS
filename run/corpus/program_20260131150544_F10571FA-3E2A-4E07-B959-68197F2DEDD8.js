function main(a1) {
    class C2 {
        m() {
            return super.length;
        }
    }
    let v9;
    try {
        const v11 = new OfflineAudioContext(1, 38400, 38400);
        v9 = v11;
    } catch(e12) {
    }
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
    try {
        const v29 = new C2();
        v21 = v29;
    } catch(e30) {
    }
    let b = v21;
    b.x0 = 1;
    b.x1 = 2;
    b.x2 = 3;
    b.x3 = 4;
    node?.length;
    let v28;
    try {
        v28 = b.m();
    } catch(e40) {
    }
    try {
        console.log(v28);
    } catch(e43) {
    }
}
for (let i45 = 0; i45 < 256; i45++) {
    try {
        main(i45);
    } catch(e52) {
    }
}
