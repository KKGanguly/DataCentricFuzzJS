function opt(a1, a2) {
    a1.b = 2;
    a2.push(0);
    a1.a = 4660;
}
function main() {
    const v10 = Array.prototype.push;
    const t7 = Object.prototype;
    t7.push = v10;
    for (let i16 = 0; i16 < 1000; i16++) {
        let a = { a: 1, b: 2 };
        opt(a, {});
    }
    let o = { a: 1, b: 2 };
    opt(o, o);
    print(o.a);
}
main();
