function Hax(a1, a2) {
    this.a = a1;
    for (let i5 = 0; i5 < a2; i5++) {
    }
    this.x = 42;
    this.y = 42;
    this.z = 42;
}
for (let i17 = 0; i17 < 10000; i17++) {
    new Hax(13.37, 1);
}
const v28 = new Hax("asdf", 1000000);
let obj = v28;
