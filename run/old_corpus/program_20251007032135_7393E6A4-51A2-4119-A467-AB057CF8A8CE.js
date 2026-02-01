function f3() {
    return 64;
}
function f4(a5) {
    const v8 = {
        10000: a5,
        d: -9007199254740990,
        e: -9007199254740990,
        [a5](a7) {
            Object.defineProperty(this, "d", { writable: true, configurable: true, get: f3 });
            super[this] = this;
            return this;
        },
        [a5]: a5,
        __proto__: f3,
        [-9007199254740990]: a5,
        g: f3,
    };
    return v8;
}
const v9 = f4(64);
const v10 = f4(-803189119);
f4(-9007199254740990);
const v12 = [-9007199254740990,64,f4,-803189119,f4];
const v13 = [v9,v12,v12];
const v17 = [[[v13,-803189119,f3,v13,64],f3],[v9]];
const v18 = [];
var a1 = v18;
for (let i21 = 0;
    i21 < 256;
    (() => {
        i21++;
        const v26 = /(x)(x)(x)\3/migvs;
        const v27 = /6(x)(x)(x)\1*/vs;
        /\P{scx=Greek}/ygvsd;
        v26.h = v17;
        let {"multiline":v29,"source":v30,"sticky":v31,} = v27;
    })()) {
    a1[i21] = i21;
}
let v35;
try { v35 = lower(addr); } catch (e) {}
let v37;
try { v37 = upper(addr); } catch (e) {}
var a2 = [v35,v37];
let v41;
try { v41 = new Function(); } catch (e) {}
var c = v41;
function f43() {
    new_array = [];
    return new_array;
}
c[Symbol?.species] = f43;
function F49(a51, a52, a53) {
    if (!new.target) { throw 'must be called with new'; }
    this.a = a1;
    this.c = v10;
    this.g = Symbol;
}
const v54 = new F49(v13, a1, v12);
new F49(a1, Symbol, v54);
new F49(v18, v9, v12);
a1.constructor = c;
const v57 = Symbol?.isConcatSpreadable;
function f58() {
    new_array[0] = {};
    return true;
}
try { a2.__defineGetter__(v57, f58); } catch (e) {}
let v63;
try { v63 = a1.concat(a2); } catch (e) {}
var res = v63;
res?.[256 / 2];
