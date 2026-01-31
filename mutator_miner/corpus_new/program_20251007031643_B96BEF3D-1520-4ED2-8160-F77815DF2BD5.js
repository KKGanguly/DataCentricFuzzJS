function f() {
    try {
        const v3 = new ArrayBuffer(1073741824);
        var a = v3;
        const v6 = new DataView(a);
        var d = v6;
        return d.getUint8() === 0;
    } catch(e11) {
        return true;
    }
}
!f();
