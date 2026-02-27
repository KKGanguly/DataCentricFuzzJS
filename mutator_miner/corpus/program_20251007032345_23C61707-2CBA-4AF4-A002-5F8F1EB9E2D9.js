let v1;
function f0(a3) {
    const v4 = () => {
    };
    const v5 = (a6) => {
        v1 = a6.errors;
    };
    a3(v4, v5);
}
function f9(a10) {
    return a10;
}
f0.resolve = f9;
const v15 = {
    then(a12, a13) {
        a13();
    },
};
let v3 = v15;
const v17 = [v3];
Promise.any.call(f0, v17);
console.log(v1[1]);
