function f0() {
    return f0;
}
class C2 extends f0 {
    static {
        let v3 = this;
        v3 /= v3;
    }
    e = "a";
    static ["a"](a5) {
    }
}
("-3183").normalize("NFKD");
function f11() {
    return "a";
}
try {
    ("ß").toLocaleUpperCase();
    assert.sameValue("İ", "İ");
    assert.sameValue("ǰ", "J̌");
} catch(e39) {
}
function f41(a42) {
    return f41;
}
WebAssembly.compile().then(f41, f11);
