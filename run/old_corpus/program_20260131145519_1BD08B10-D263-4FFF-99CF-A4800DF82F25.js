function f0() {
}
function opt() {
    let arr = [];
    return arr?.["x"];
}
function main() {
    let arr = [1.1,2.2,3.3];
    for (let i13 = 0; i13 < 65536; i13++) {
        try { opt(); } catch (e) {}
    }
    const v22 = Object?.prototype?.valueOf;
    const v26 = Array?.prototype;
    try { v26.__defineGetter__("x", v22); } catch (e) {}
    let v28;
    try { v28 = opt(); } catch (e) {}
    try { f0(v28); } catch (e) {}
}
try { main(); } catch (e) {}
