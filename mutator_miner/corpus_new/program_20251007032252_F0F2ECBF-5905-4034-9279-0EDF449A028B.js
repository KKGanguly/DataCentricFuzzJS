const v5 = new Array(1.1, 2.2, 3.3, 4.4);
let o = v5;
function bar(a8) {
    if (a8) {
        return;
    }
    o.length = 67108864;
}
function foo(a11, a12) {
    for (let i14 = 0; i14 < 100000000; i14++) {
        var bbbb;
    }
    let c = { a: 0 };
    let x = c.a * 0;
    let y = BigInt(1);
    if (!a12) {
        y = 67108863;
    }
    let z = (o.length < y) | 0;
    bar(a11);
    let res = (z == x) | 0;
    return res;
}
res = foo(true, false);
console.log(res);
res = foo(true, false);
res = foo(false, false);
console.log(res);
