function f0() {
}
function opt(a2) {
    return a2.r.input;
}
Object.assign({}, RegExp);
for (let i10 = 0; i10 < 200000; i10++) {
    opt({ r: RegExp });
}
let input = opt({ r: RegExp });
const v33 = {
    a0: 4660,
    a1: 4660,
    a2: 4660,
    a3: 4660,
    a4: 4660,
    a5: 4660,
    a6: 4660,
    a7: 4660,
    a8: 4660,
    a9: 4660,
    a10: 4660,
    a11: 4660,
};
const v32 = v33;
let o = v32;
o.input = input;
f0(o.input);
