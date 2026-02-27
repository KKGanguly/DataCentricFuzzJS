oobArray = [];
for (let i3 = 0; i3 < 100000; ++i3) {
    oobArray[i3] = 1.1;
}
const v14 = new Float64Array(oobArray.length);
floatArray = v14;
function f16(a17) {
    oobArray.length = 0;
    return floatArray;
}
Float64Array.from.call(f16, oobArray);
