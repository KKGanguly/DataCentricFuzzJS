try {
    var arrays = ["Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array"];
    let v12;
    try { v12 = Math.random(); } catch (e) {}
    const v14 = v12 * arrays?.length;
    let v15;
    try { v15 = Math.floor(v14); } catch (e) {}
    var some = arrays?.[v15];
    const t8 = window?.[some]?.prototype;
    t8.set = 262143;
    const v22 = window?.[some];
    const v24 = [0];
    function f25() {
    }
    try { new v22(v24, f25); } catch (e) {}
} catch(e27) {
}
