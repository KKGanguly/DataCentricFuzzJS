function* test() {
    try {
        yield 42;
    } catch(e3) {
    }
}
var t = test();
t.next();
var v = t.return();
