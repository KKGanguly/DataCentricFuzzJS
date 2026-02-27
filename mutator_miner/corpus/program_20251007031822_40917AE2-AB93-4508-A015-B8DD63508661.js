function main() {
    const v2 = [13.37];
    let v3 = 9007199254740992;
    v2.length = 0;
    const v5 = v2.concat(v3);
    for (let i10 = 0; i10 < 100; i10++) {
        const v17 = new Uint8Array();
        const v11 = v17;
        const v12 = v11[v5];
    }
}
main();
