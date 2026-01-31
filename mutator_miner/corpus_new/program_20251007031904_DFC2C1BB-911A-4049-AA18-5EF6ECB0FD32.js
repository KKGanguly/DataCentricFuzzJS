function createLargeObject() {
    var temparray = [];
    for (let i4 = 0; i4 < 10000; i4++) {
        temparray[i4] = i4;
    }
    return { obj: temparray };
}
function leak() {
    globalarray = [];
    for (let i15 = 0; i15 < 20000; i15++) {
        globalarray[i15] = [];
        var innerarray = globalarray[i15];
        var largeObj = createLargeObject();
        innerarray[0] = largeObj;
        innerarray.splice(0, 1);
    }
}
