const option = { maxByteLength: 6584357 };
const v5 = new ArrayBuffer(3782, option);
const ab = v5;
const v8 = new Int16Array(ab);
const u16a = v8;
const source = [1337,12152449,2];
ab.resize();
function foo() {
    return u16a;
}
const v18 = Float64Array.of;
try { v18.call(foo, source); } catch (e) {}
