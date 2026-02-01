const v3 = Array.prototype.push;
Array.prototype.__defineGetter__("a", v3);
function opt() {
    const v11 = new Array(1, 2, 3, 4);
    let arr = v11;
    arr["a" + ""];
}
for (let i18 = 0; i18 < 1000; i18++) {
    opt();
}
