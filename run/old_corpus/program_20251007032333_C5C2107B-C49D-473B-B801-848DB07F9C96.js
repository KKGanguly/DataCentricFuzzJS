function deepEquals(a1, a2) {
    if (a1 === a2) {
        if (a1 === 0) {
            return (1 / a1) === (1 / a2);
        }
    }
}
deepEquals = deepEquals;
function assertEquals(a13, a14) {
    if (deepEquals(a14, a13)) {
    }
}
assertEquals = assertEquals;
var __v_0 = Array(10000).join("X");
const v24 = /^|X/g;
function f25(a26, a27) {
    assertEquals("X", a26, "at position 0x" + a27.toString());
}
__v_0.replace(v24, f25);
const v35 = /^|X/g;
function f36(a37, a38, a39) {
    assertEquals("X", a37, "at position 0x" + a38.toString());
}
__v_0.replace(v35, f36);
let __v_5 = Uint8Array.__proto__;
let __v_6 = __v_5.prototype;
assertEquals();
assertEquals(__v_6.__proto__, Object.prototype);
function __f_0() {
}
