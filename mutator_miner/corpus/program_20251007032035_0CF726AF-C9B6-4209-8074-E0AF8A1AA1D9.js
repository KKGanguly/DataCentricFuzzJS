function f0() {
}
const v1 = () => {
    externalizeString("1", false);
};
f0(v1);
const v7 = () => {
    externalizeString("1", true);
};
f0(v7);
