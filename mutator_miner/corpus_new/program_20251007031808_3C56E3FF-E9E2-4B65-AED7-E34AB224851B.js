function f(a1, a2) {
    a1.x = a2;
    a1[0] = undefined;
    return a1;
}
f([1], 1);
f([2], 1);
const v16 = %HeapObjectVerify(f([3], undefined));
