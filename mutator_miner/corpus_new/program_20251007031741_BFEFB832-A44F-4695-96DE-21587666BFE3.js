function main() {
    var v4 = [13.37,13.37,1337,13.37,13.37];
    const v10 = new Proxy(JSON, v4);
    var v5 = v10;
    var v7 = Object.freeze(v5);
    var v8 = JSON / 13.37;
    var v9 = JSON.stringify(v7);
}
main();
