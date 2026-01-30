function opt() {
    let arr = [];
    return arr["x"];
}
function main() {
    let arr = [1.1,2.2,3.3];
    for (let i12 = 0; i12 < 65536; i12++) {
        opt();
    }
    const v22 = Object.prototype.valueOf;
    Array.prototype.__defineGetter__("x", v22);
    print(opt());
}
main();
