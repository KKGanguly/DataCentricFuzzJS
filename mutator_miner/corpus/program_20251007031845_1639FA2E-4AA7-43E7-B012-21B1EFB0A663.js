function f(a1) {
    a1.x = 0;
    a1[1] = 0.1;
    a1.x = {};
}
f({});
const v9 = new Array(1);
f(v9);
const v12 = new Array(1);
f(v12);
