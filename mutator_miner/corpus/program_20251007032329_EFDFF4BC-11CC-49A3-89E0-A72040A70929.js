function f0() {
}
let nop = f0;
function func(a3) {
    var bar = 0;
    for (const v6 in a3) {
        try {
            for (let i8 = 0; i8 < 2; i8++) {
                nop();
                bar += i8[v6];
            }
        } catch(e16) {
        }
    }
}
const v17 = %PrepareFunctionForOptimization(func);
func({ x: 20, y: 11 });
