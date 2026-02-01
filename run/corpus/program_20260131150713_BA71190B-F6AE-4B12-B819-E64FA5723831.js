try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e3) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
let v6;
try {
    const v11 = new Binary();
    v6 = v11;
} catch(e12) {
}
let binary = v6;
try {
    binary.emit_header();
} catch(e15) {
}
const v16 = (a17) => {
    try {
        a17.emit_u32v(1);
    } catch(e20) {
    }
    try {
        a17.emit_u8(kWasmFunctionTypeForm);
    } catch(e23) {
    }
    try {
        a17.emit_u32v(0);
    } catch(e26) {
    }
    try {
        a17.emit_u32v(0);
    } catch(e29) {
    }
};
const v10 = v16;
try {
    binary.emit_section(kTypeSectionCode, v10);
} catch(e33) {
}
const v34 = (a35) => {
    try {
        a35.emit_u32v(1);
    } catch(e38) {
    }
    try {
        a35.emit_u32v(0);
    } catch(e41) {
    }
};
const v22 = v34;
try {
    binary.emit_section(kFunctionSectionCode, v22);
} catch(e45) {
}
try {
    binary.emit_u8(kCodeSectionCode);
} catch(e48) {
}
try {
    binary.emit_u8(2);
} catch(e51) {
}
try {
    binary.emit_u8(1);
} catch(e54) {
}
try {
    binary.emit_u8(64);
} catch(e57) {
}
const v38 = binary?.length;
let v39;
try {
    const v63 = new ArrayBuffer(v38);
    v39 = v63;
} catch(e64) {
}
let buffer = v39;
let v42;
try {
    const v69 = new Uint8Array(buffer);
    v42 = v69;
} catch(e70) {
}
let view = v42;
for (let i73 = 0; i73 < binary?.length; i73++) {
    view[i73] = binary?.[i73] | 0;
}
try {
    WebAssembly.validate(buffer);
} catch(e84) {
}
