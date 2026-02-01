function f0() {
}
function main() {
    let arr = [1.1,1.1,1.1,1.1,1.1];
    function opt(a10) {
        arr[0] = 1.1;
        arr[1] = 2.3023e-320 + parseInt(("a").replace("a", a10));
        arr[2] = 1.1;
        arr[3] = 1.1;
    }
    const v21 = () => {
        return "0";
    };
    const v20 = v21;
    let r0 = v20;
    for (let i26 = 0; i26 < 4096; i26++) {
        opt(r0);
    }
    const v33 = () => {
        arr[0] = {};
        return "0";
    };
    const v31 = v33;
    opt(v31);
    f0(arr[1]);
}
main();
