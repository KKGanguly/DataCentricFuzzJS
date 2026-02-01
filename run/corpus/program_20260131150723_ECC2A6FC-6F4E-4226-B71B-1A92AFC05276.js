function deepEquals(a1, a2) {
    if (a1 === a2) {
        if (a1 === 0) {
            return (1 / a1) === (1 / a2);
        }
    }
}
deepEquals = deepEquals;
function assertEquals(a12, a13) {
    if (deepEquals(a13, a12)) {
    }
}
assertEquals = assertEquals;
var __v_0 = Array(10000).join("X");
const v24 = /^|X/g;
function f25(a24, a25) {
    assertEquals("X", a24, "at position 0x" + a25.toString());
}
__v_0.replace(v24, f25);
const v35 = /^|X/g;
function f36(a35, a36, a37) {
    assertEquals("X", a35, "at position 0x" + a36.toString());
}
__v_0.replace(v35, f36);
let __v_5 = Uint8Array.__proto__;
let __v_6 = __v_5.prototype;
assertEquals();
assertEquals(__v_6.__proto__, Object.prototype);
function __f_0() {
}
