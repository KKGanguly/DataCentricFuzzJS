const v0 = /\1112xyz{1,32}?DZu/mygd;
const v1 = /FC\xed\xa0\x80((\xed\xa0\x80))\x02/yugsd;
const v2 = /a(?:b)/misd;
const v3 = [1.7976931348623157e+308,1e-15,0.23375238793427366,1000000000000.0,-1000000000000.0];
const v4 = [0.10142221271390062,-Infinity,NaN,185614.78328380757,2.2250738585072014e-308,-4.0,1000000000.0];
[5.327630466332167e+307,-1000000000.0,-1000.0];
function f6() {
    return v0;
}
function F7(a9, a10, a11, a12) {
    if (!new.target) { throw 'must be called with new'; }
    this.g = v3;
    this.h = a12;
    a12.f = a9;
}
new F7(v0, v0, v2, v4);
const v14 = new F7(v2, v1, v0, v4);
new F7(v2, v0, v2, v4);
new Float64Array(3);
new BigInt64Array(16);
new Int8Array(256);
function f25() {
}
function opt(a27, a28) {
    a27[0] = 1.1;
    typeof a27?.[a28];
    a27[0] = a28;
}
function main() {
    let arr = [1.1,2.2,3.3];
    for (let i39 = 0; i39 < 65536; i39++) {
        const v45 = {};
        try { opt(arr, v45); } catch (e) {}
    }
    const v47 = () => {
        const v48 = {};
        arr[0] = v14;
        throw 1;
    };
    const v50 = { toString: v47 };
    const v51 = arr?.[0];
    try { v51(v51); } catch (e) {}
}
try { main(); } catch (e) {}
