function assert(a1) {
    if (!a1) {
        throw "Assertion failed";
    }
}
function assertFalse(a5) {
    assert(!a5);
}
function poc() {
    function hax(a10) {
        a10.c = 13.37;
    }
    function makeObjWithMap5() {
        let o = {};
        o.a = 13.37;
        o.b = {};
        return o;
    }
    let m1 = {};
    let m2 = {};
    const v21 = %HaveSameMap(m2, m1);
    assert(v21);
    m2.a = 13.37;
    let m3 = {};
    m3.a = 13.37;
    const v27 = %HaveSameMap(m3, m2);
    assert(v27);
    m3.b = 1;
    let m4 = {};
    m4.a = 13.37;
    m4.b = 1;
    const v34 = %HaveSameMap(m4, m3);
    assert(v34);
    m4.c = {};
    let m4_2 = {};
    m4_2.a = 13.37;
    m4_2.b = 1;
    m4_2.c = {};
    const v42 = %HaveSameMap(m4_2, m4);
    assert(v42);
    let m5 = {};
    m5.a = 13.37;
    const v47 = %HaveSameMap(m5, m2);
    assert(v47);
    m5.b = 13.37;
    const v50 = %HaveSameMap(m5, m3);
    assertFalse(v50);
    const v52 = %HaveSameMap(m5, m3);
    assertFalse(v52);
    let m6 = makeObjWithMap5();
    const v56 = %HaveSameMap(m6, m5);
    assert(v56);
    hax(m6);
    let kaputt = makeObjWithMap5();
    const v61 = %HaveSameMap(kaputt, m5);
    assert(v61);
    for (let i64 = 0; i64 < 100000; i64++) {
        let o = i64 == 1337 ? makeObjWithMap5() : m6;
        hax(o);
    }
    let m7 = m4_2;
    const v77 = %HaveSameMap(m7, m4);
    assert(v77);
    m7.c;
    const v80 = %HaveSameMap(m7, m4);
    assertFalse(v80);
    kaputt.a = "asdf";
    const v83 = %HaveSameMap(kaputt, m5);
    assert(v83);
    hax(kaputt);
    const v86 = %HeapObjectVerify(kaputt);
    console.log(kaputt.a);
}
const v90 = %NeverOptimizeFunction(poc);
poc();
