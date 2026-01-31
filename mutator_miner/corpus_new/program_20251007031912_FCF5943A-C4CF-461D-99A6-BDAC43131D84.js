function opt(a1) {
    Array.prototype.unshift(2.3023e-320);
}
ar = {};
for (let i9 = 0; i9 < 20; i9++) {
    opt([]);
}
for (let i18 = 0; i18 < 20; i18++) {
    opt(ar);
}
for (let i27 = 0; i27 < 20; i27++) {
    opt([]);
}
for (let i36 = 0; i36 < 20; i36++) {
    opt(ar);
}
o31 = [1.1,2.2,3.3];
o31["37"] = 2.3023e-320;
o51 = o31.concat(false);
o51.sort();
