function cons() {
}
function opt(a2, a3) {
    a2.b = 1;
    new cons();
    a2.a = a3;
}
function main() {
    for (let i8 = 0; i8 < 2000; i8++) {
        cons.prototype = {};
        let o = { a: 1, b: 2 };
        opt(o, {});
    }
    let o = { a: 1, b: 2 };
    cons.prototype = o;
    opt(o, 4660);
    print(o.a);
}
main();
