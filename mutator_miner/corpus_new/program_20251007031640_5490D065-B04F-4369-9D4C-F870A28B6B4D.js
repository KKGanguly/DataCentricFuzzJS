var bigArray = [];
var bigNum = 123456789;
var smallNum = 123;
var toStringCount = 0;
function fillBigArrayViaToString(a9) {
    var results = [];
    for (let i13 = 0; i13 < a9; i13++) {
        fillBigArrayViaToString.toString();
    }
    return results;
}
function f19(a20) {
    toStringCount++;
    bigArray.push(smallNum);
    if (toStringCount == 2000) {
        const v27 = new Uint32Array(8000);
        var newArray = v27;
        for (let i30 = 0; i30 < newArray.length; i30++) {
            newArray[i30] = 268435456;
        }
    }
    bigArray.push(fillBigArrayViaToString);
    bigArray.push(fillBigArrayViaToString);
    bigArray.push(fillBigArrayViaToString);
    return bigNum;
}
const t26 = Function.prototype;
t26.toString = f19;
fillBigArrayViaToString(4000).join();
bigArray.length = 4000;
var stringResult = bigArray.join(":");
