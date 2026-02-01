var a1 = [];
for (let i3 = 0; i3 < 256; i3++) {
    a1[i3] = i3;
}
let v11;
try {
    v11 = lower(addr);
} catch(e14) {
}
let v13;
try {
    v13 = upper(addr);
} catch(e20) {
}
var a2 = [v11,v13];
let v17;
try {
    const v26 = new Function();
    v17 = v26;
} catch(e27) {
}
var c = v17;
function f19() {
    new_array = [];
    return new_array;
}
c[Symbol?.species] = f19;
a1.constructor = c;
const v25 = Symbol?.isConcatSpreadable;
function f26() {
    new_array[0] = {};
    return true;
}
try {
    a2.__defineGetter__(v25, f26);
} catch(e42) {
}
let v31;
try {
    v31 = a1.concat(a2);
} catch(e46) {
}
var res = v31;
res?.[256 / 2];
