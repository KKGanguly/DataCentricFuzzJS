function f0() {
}
let x = 1;
x = 0;
function opt() {
    let v4 = 0;
    for (let i8 = 0; i8 < 10; i8++) {
        for (let i15 = 0; i15 < 6; i15++) {
            switch (v4) {
                case 0:
                    v4 = 1;
                    break;
                case 1:
                    v4 = 2;
                    break;
                case 2:
                    v4 = 3;
                    break;
                case 3:
                    v4 = 4;
                    break;
                case 4:
                    v4 = x;
                    break;
            }
        }
    }
    return v4;
}
const v30 = %PrepareFunctionForOptimization(opt);
const v29 = v30;
f0(opt());
f0(opt());
const v36 = %OptimizeFunctionOnNextCall(opt);
const v35 = v36;
f0(opt());
