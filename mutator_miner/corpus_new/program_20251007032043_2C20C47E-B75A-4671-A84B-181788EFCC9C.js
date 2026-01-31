function bar(a1, a2) {
    let o = { c0: 0, cf: false };
    let x = ((a1 & 5) == 2) | 0;
    let y = ((a1 & 6) == 1) | 0;
    ("a")[x];
    ("a")[y];
    x = (x + (o.cf ? "" : (2 ** 30) - (o.c0 & 1))) - (2 ** 30);
    y = (y + (o.cf ? "" : (2 ** 30) - (o.c0 & 1))) - (2 ** 30);
    x = Math.min((2 ** 32) - 1, x + ((2 ** 32) - 1)) - ((2 ** 32) - 1);
    y = Math.min((2 ** 32) - 1, y + ((2 ** 32) - 1)) - ((2 ** 32) - 1);
    let confused = Math.max(-1, x & y);
    confused = Math.max(-1, confused);
    confused = (0 - confused) >> 31;
    return confused;
}
console.log(bar(3, true));
for (let i110 = 0; i110 < (3 * (10 ** 4)); i110 += 1) {
    bar(0, true);
}
console.log(bar(3, true));
