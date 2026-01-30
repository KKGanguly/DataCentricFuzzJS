function f0() {
}
class C1 {
}
class C2 extends C1 {
    constructor(a4, a5, a6) {
        arguments[1];
    }
}
function f9() {
    C2();
}
f0(f9, TypeError);
function f13() {
    C2(1);
}
f0(f13, TypeError);
function f17() {
    C2(1, 2);
}
f0(f17, TypeError);
function f22() {
    C2(1, 2, 3);
}
f0(f22, TypeError);
function f28() {
    C2(1, 2, 3, 4);
}
f0(f28, TypeError);
function f35() {
    C2.call();
}
f0(f35, TypeError);
function f38() {
    C2.call({});
}
f0(f38, TypeError);
function f42() {
    C2.call({}, 1);
}
f0(f42, TypeError);
function f47() {
    C2.call({}, 1, 2);
}
f0(f47, TypeError);
function f53() {
    C2.call({}, 1, 2, 3, 4);
}
f0(f53, TypeError);
