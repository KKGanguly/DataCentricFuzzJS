var array = [];
function f2() {
    try { array.length = array; } catch (e) {}
    return "funky";
}
var funky = { toJSON: f2 };
for (let i8 = 0; i8 < 10; i8++) {
    array[i8] = i8;
}
array[0] = funky;
JSON.stringify(array);
