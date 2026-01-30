function opt2(a1, a2) {
    if (a2 > 0) {
        a1();
    } else {
        a1.x = 1.1;
    }
}
function opt() {
    opt2(2.3023e-320, null);
}
function main() {
    const v12 = () => {
    };
    opt2(v12, 1);
    for (let i16 = 0; i16 < 10000; i16++) {
        opt();
    }
}
main();
