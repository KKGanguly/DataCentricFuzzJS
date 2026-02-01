function opt(a1, a2) {
    a1[1] = a2;
    a1[0] = 2.3023e-320;
}
function main() {
    for (let i6 = 0; i6 < 65536; i6++) {
        opt([1.1], 2.2);
    }
    let arr = [1.1];
    opt(arr, -5.3049894784e-314);
    print(arr);
}
main();
