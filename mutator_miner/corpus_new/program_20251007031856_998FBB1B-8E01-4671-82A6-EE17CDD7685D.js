try {
    var ba;
    function s() {
        ba = this;
    }
    function dummy() {
        try { console.log("just a function"); } catch (e) {}
    }
    const v9 = Array?.prototype;
    const v11 = { set: s };
    try { Object.defineProperty(v9, "0", v11); } catch (e) {}
    const v14 = {};
    let v19;
    try { v19 = dummy.bind(v14, 1, 2, 3, 4); } catch (e) {}
    var f = v19;
    ba.length = 100000;
    try { f(1, 2, 3); } catch (e) {}
} catch(e26) {
}
