function f0() {
}
function f(a2, a3) {
    a2[a3] = "object";
}
f("make it generic", 0);
var kLength = 500000 / 8;
var kValue = 0.1;
const v15 = new Array(kLength);
var a = v15;
for (let i18 = 0; i18 < kLength; i18++) {
    a[i18] = kValue;
}
f(a, 0);
for (let i26 = 1; i26 < kLength; i26++) {
    f0(kValue, a[i26]);
}
