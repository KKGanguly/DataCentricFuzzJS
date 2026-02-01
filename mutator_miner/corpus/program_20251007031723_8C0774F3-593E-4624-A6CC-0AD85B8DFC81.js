function f0() {
}
const v2 = [];
const v3 = {};
function f4() {
}
for (const v6 of [false,v2,v3,f4]) {
    const v7 = () => {
        const v9 = { timeZone: v6 };
        const v11 = new Date();
        return v11.toLocaleString(undefined, v9);
    };
    f0(v7, RangeError);
}
