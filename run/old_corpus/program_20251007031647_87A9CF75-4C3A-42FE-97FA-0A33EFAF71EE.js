const ary = [1.1];
Object.defineProperty(ary, 0, { get: run_it });
run_it(undefined);
function run_it(a11) {
    try {
        const ret_bool = ary.includes();
        const obj_1 = Object.freeze(ary);
    } catch(e16) {
        const v18 = [];
        function f19() {
        }
        const v20 = new Proxy(v18, f19);
        ary.length = v20;
    }
    ary[0] = 1.1;
    return 2.2;
}
