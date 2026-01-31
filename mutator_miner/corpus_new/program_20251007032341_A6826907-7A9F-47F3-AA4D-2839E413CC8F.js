function func0(a1) {
    function func1(a3) {
        a3.pop();
    }
    const v5 = () => {
    };
    a1(func1, v5);
}
function f7(a8) {
    return a8;
}
func0.resolve = f7;
const v15 = {
    then(a10, a11) {
        v3 = a10;
        a11("1");
    },
};
var v4 = v15;
const v17 = [v4];
Promise.allSettled.call(func0, v17);
v3("1");
