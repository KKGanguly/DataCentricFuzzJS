var array = [];
function f2() {
    array.length = 1;
    return "funky";
}
var funky = { toJSON: f2 };
for (let i8 = 0; i8 < 10; i8++) {
    array[i8] = i8;
}
array[0] = funky;
JSON.stringify(array);
