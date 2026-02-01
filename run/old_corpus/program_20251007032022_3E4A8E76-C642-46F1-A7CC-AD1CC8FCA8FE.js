function opt(a1, a2, a3) {
    a1.b = 1;
    class C5 extends a2 {
    }
    a1.a = a3;
}
function main() {
    for (let i8 = 0; i8 < 2000; i8++) {
        let o = { a: 1, b: 2 };
        function f18() {
        }
        opt(o, f18, {});
    }
    let o = { a: 1, b: 2 };
    function f25() {
    }
    let cons = f25;
    cons.prototype = o;
    opt(o, cons, 4660);
    print(o.a);
}
main();
