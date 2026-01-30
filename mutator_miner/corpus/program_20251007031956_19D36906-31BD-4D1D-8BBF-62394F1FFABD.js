function test() {
    Object.fromEntries([[]]);
    const v5 = %DeoptimizeNow();
}
test();
