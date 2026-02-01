function opt() {
    let obj = "2.3023e-320";
    for (let i4 = 0; i4 < 1; i4++) {
        obj.x = obj;
        obj = +obj;
        obj.x = obj;
    }
}
function main() {
    for (let i15 = 0; i15 < 100; i15++) {
        opt();
    }
}
main();
