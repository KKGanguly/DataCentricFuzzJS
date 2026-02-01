function F0() {
    if (!new.target) { throw 'must be called with new'; }
}
const v2 = class extends F0 {
}
v2.name = v2;
const v4 = typeof true;
v4[5] = v4;
