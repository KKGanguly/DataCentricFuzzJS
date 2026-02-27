y = BigInt("0xffffffffffffffff");
function b() {
    let x = BigInt.asIntN(64, -1n);
    console.log("x: ", x);
    console.log("y: ", y);
    let lol = x >> y;
    return BigInt.asIntN(64, lol);
}
console.log("lol: ", b());
console.log("lol: ", b());
const v27 = %OptimizeFunctionOnNextCall(b);
console.log("lol: ", b());
