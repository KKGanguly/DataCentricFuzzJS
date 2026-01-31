function inlinee() {
    return inlinee.arguments[0];
}
function opt(a4) {
    let stack_arr = [];
    stack_arr[20] = 1.1;
    stack_arr[10000] = 1.1;
    stack_arr[20000] = 2.2;
    let heap_arr = inlinee(stack_arr);
    a4(heap_arr);
    stack_arr[10000] = 2.3023e-320;
    return heap_arr[10000];
}
function main() {
    for (let i17 = 0; i17 < 10000; i17++) {
        const v25 = new Function("");
        opt(v25);
    }
    const v27 = (a28) => {
        a28[10000] = {};
    };
    print(opt(v27));
}
