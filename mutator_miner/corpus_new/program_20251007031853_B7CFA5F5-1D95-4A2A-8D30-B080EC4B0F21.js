function main() {
    RegExp.input = { toString: f };
    const v4 = RegExp.lastMatch;
    try { alert(v4); } catch (e) {}
}
var input = ([Array(10000000).join("a"),Array(11).join("b"),Array(100).join("a")]).join("");
function f() {
    String.prototype.match.call(input, "bbbbbbbbbb");
}
try { main(); } catch (e) {}
