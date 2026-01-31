const magic0 = 2396;
const magic1 = 1972;
const xs = [];
for (let i7 = 0; i7 < magic0; ++i7) {
    xs[i7] = [i7 + 0.1];
}
let cmp_calls = 0;
const v17 = (a18, a19) => {
    a18 = a18 || [0];
    a19 = a19 || [0];
    if (cmp_calls++ == magic1) {
        xs.length = 1;
    }
    return a18[0] - a19[0];
};
xs.sort(v17);
