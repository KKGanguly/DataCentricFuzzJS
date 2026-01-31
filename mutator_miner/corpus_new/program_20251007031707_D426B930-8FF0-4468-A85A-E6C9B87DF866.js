function opt() {
    let tmp = [];
    tmp[0] = tmp;
    return tmp[0];
}
function main() {
    for (let i6 = 0; i6 < 4096; i6++) {
        opt();
    }
    print(opt());
}
main();
