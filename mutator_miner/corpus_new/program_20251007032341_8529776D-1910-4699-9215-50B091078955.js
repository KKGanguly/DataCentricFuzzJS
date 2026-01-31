let x = 1;
x = 0;
function opt() {
    let v4 = 0;
    for (let i7 = 0; i7 < 10; i7++) {
        for (let i14 = 0; i14 < 6; i14++) {
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
const v29 = %PrepareFunctionForOptimization(opt);
print(opt());
print(opt());
const v35 = %OptimizeFunctionOnNextCall(opt);
print(opt());
