function O1() {
    this.s = "foobar";
    this.a = 42;
    delete this.a;
}
function f7() {
    return this.s;
}
const t8 = O1.prototype;
t8.toString = f7;
function v4(a12) {
    delete a12.nonExistent;
    return a12.toString();
}
function v11() {
    const v22 = { p: 1337 };
    v4(v22);
    let v26 = 0;
    do {
        const v22 = new O1();
        const v17 = v22;
        v4(v17);
        v26++;
    } while (v26 < 100)
}
for (let i29 = 0; i29 < 100; i29++) {
    const v37 = v11();
}
