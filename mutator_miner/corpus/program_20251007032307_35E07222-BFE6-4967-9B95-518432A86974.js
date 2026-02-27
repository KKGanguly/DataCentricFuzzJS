try {
    d8.test.setFlushDenormals(true);
} catch(e4) {
}
try {
    (-1e-301).toString(2);
} catch(e9) {
}
