function f0() {
}
const v2 = [];
const v3 = {};
function f4() {
}
for (const v8 of [false,v2,v3,f4]) {
    const v9 = () => {
        const v9 = { timeZone: v8 };
        const v13 = new Date();
        const v11 = v13;
        return v11.toLocaleString(undefined, v9);
    };
    const v7 = v9;
    f0(v7, RangeError);
}
