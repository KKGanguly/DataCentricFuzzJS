function opt() {
    let obj = [2.3023e-320];
    for (let i5 = 0; i5 < 1; i5++) {
        obj.x = 1;
        obj = +obj;
        obj.x = 1;
    }
}
function main() {
    for (let i16 = 0; i16 < 1000; i16++) {
        opt();
    }
}
main();
