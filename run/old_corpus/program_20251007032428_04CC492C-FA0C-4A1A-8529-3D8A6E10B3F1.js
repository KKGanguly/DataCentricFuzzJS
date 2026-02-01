const obj3 = { a: 42 };
const obj4 = { a: 42 };
const obj5 = { a: 42 };
const obj6 = { a: 42 };
obj5.c = "test";
obj3.a = 13.37;
function foo(a15, a16) {
    const obj11 = a15.e;
    const obj12 = { a: 42 };
    function inlined_func1() {
        a15.e = 13.37;
        a16.g = obj2;
    }
    function inlined_func2() {
        return obj12;
    }
    const obj24 = [13.37];
    const obj26 = [13.37];
    const obj27 = [BigInt,512,obj24,obj24,BigInt,"test",13.37,BigInt,obj26,13.37];
    for (let i40 = 0; i40 < 100; i40++) {
        const obj31 = inlined_func2(a15, obj12);
    }
    a16.d = 42;
}
const obj32 = { a: 42 };
for (let i53 = 0; i53 < 100; i53++) {
    foo(obj4, obj32);
}
for (let i61 = 0; i61 < 100; i61++) {
    foo(1, obj6);
}
const obj43 = foo(obj5, obj32);
