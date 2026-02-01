const v3 = Array.prototype.push;
Array.prototype.__defineGetter__("a", v3);
function opt() {
    const v12 = new Array(1, 2, 3, 4);
    const v11 = v12;
    let arr = v11;
    arr["a" + ""];
}
for (let i20 = 0; i20 < 1000; i20++) {
    opt();
}
