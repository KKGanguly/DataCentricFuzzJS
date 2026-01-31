function main() {
    const v2 = Date["now"]();
    const v3 = /c\d\Sd\wr.z/ig;
    const v4 = v3.test(v2);
    gc();
}
main();
const v12 = %CompileBaseline(main);
main();
const v14 = %OptimizeFunctionOnNextCall(main);
main();
