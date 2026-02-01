const v1 = class {
    static get c() {
    }
}
const v3 = class extends Uint16Array {
}
const v4 = new v3();
v1 >= v4;
for (let i7 = 0; i7 < 100000; ++i7) {
    for (let v14 = 0; v14 < 5; v14++) {
        ("𠮷").codePointAt(v14);
    }
}
