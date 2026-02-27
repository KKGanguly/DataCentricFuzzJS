function opt(a1) {
    return a1.r.input;
}
Object.assign({}, RegExp);
for (let i9 = 0; i9 < 200000; i9++) {
    opt({ r: RegExp });
}
let input = opt({ r: RegExp });
const v32 = {
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
let o = v32;
o.input = input;
print(o.input);
