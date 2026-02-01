function f0(a1) {
    a1[1];
    return parseInt(a1);
}
new Uint8Array(("00 61 73 6d 01 00 00 00 00 05 04 42 42 42 42 0 1F 04 41 41 41 41").split(/[\s\r\n]+/g).map(f0));
