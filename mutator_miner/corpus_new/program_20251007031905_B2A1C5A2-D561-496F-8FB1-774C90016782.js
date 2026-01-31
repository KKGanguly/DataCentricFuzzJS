function main() {
    let arr = [1];
    arr.length = 1048576;
    arr.splice(0, 17);
    arr.length = 4294967280;
    arr.splice(4294967280, 0, 1);
}
main();
