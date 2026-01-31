let v2 = Object;
const v3 = new Proxy(Object, v2);
const v4 = v3;
const v6 = (9).__proto__;
v6.__proto__ = v4;
function v8(a9, a10, a11) {
    let v14 = 0;
    do {
        const v16 = (4919).prototype;
        v14++;
    } while (v14 < 24)
}
const v7 = [1,2,3,4];
const v17 = v7.findIndex(v8);
