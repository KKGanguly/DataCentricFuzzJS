function f0() {
}
const v3 = Array(65536);
f0(Array.isArray(Array.of.apply(Array, v3)), true);
const v11 = Array(65536);
f0(Array.isArray(Array.of.apply(null, v11)), true);
