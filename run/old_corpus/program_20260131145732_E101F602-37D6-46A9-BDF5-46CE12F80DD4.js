const v1 = Array.reverse;
try {
    v1.call(Array, v1, v1);
} catch(e3) {
}
