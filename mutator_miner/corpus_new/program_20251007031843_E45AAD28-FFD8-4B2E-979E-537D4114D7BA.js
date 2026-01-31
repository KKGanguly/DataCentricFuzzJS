function f0() {
}
function Test() {
    const v2 = () => {
        return 42;
    };
    var f = v2;
    delete f.length;
    delete f.name;
    var g = Object.create(f);
    for (let i11 = 0; i11 < 5; i11++) {
        g.dummy;
    }
    const v18 = %HasFastProperties(f);
    f0(v18);
    var h = f.bind(this);
}
Test();
