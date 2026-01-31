const obj7 = -1;
function foo(a4) {
    let obj10 = 0;
    let obj11 = 0;
    for (let i10 = 0; i10 < 16; i10++) {
        const obj13 = a4.length;
        const obj14 = obj11 < obj13;
        if (obj14) {
            const obj15 = a4[obj11];
            const obj17 = obj11 + 1;
            const obj18 = a4[obj17];
            const obj19 = obj15 + obj18;
            const obj20 = obj10 / obj19;
            obj10 = obj20;
            let obj21 = 0;
            do {
                try {
                    const obj23 = !obj7;
                } catch(e35) {
                }
                obj21++;
            } while (obj21 < 7)
        } else {
            break;
        }
        const obj27 = obj11 + 2;
        obj11 = obj27;
    }
}
const obj32 = [1,2,3,4];
const v48 = %PrepareFunctionForOptimization(foo);
foo(obj32);
foo(obj32);
foo(obj32);
console.log("maglev");
const v55 = %OptimizeMaglevOnNextCall(foo);
foo(obj32);
