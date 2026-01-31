function set(a1, a2) {
    a1[0] = a2;
}
function getImmutableArrayOrSet(a4, a5) {
    let arr = [1];
    if (a4) {
        return arr;
    }
    set(arr, a5);
    set({}, 1);
}
function main() {
    getImmutableArrayOrSet(true);
    for (let i17 = 0; i17 < 100; i17++) {
        getImmutableArrayOrSet(false, {});
    }
    let arr = getImmutableArrayOrSet(true);
    print(arr[0] === 1);
}
main();
