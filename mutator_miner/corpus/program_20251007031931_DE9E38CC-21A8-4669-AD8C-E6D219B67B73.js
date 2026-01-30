let xs = [];
for (let i3 = 0; i3 < 205; ++i3) {
    xs.push(i3);
}
const v10 = (a11, a12) => {
    xs.shift();
    const v15 = -246;
    xs[xs.length] = v15;
    return a11 - a12;
};
xs.sort(v10);
