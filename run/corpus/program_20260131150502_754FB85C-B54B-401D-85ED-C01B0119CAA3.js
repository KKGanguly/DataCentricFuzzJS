try {
    function f0() {
    }
    const v3 = d8?.file;
    try {
        v3.execute("/mnt/c/Users/asus/Downloads/v8/v8/test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e6) {
    }
    let v6;
    try {
        const v10 = new WasmModuleBuilder();
        v6 = v10;
    } catch(e11) {
    }
    const builder = v6;
    let v11;
    try {
        v11 = makeField(kWasmI32, false);
    } catch(e19) {
    }
    const v12 = [v11];
    let v15;
    try {
        v15 = builder.addStruct(v12, kNoSuperType, false);
    } catch(e27) {
    }
    let $struct2 = v15;
    try {
        builder.startRecGroup();
    } catch(e30) {
    }
    let v20;
    try {
        v20 = builder.addArray(kWasmI32, true, kNoSuperType, false);
    } catch(e38) {
    }
    let $array4 = v20;
    const v22 = [];
    const v23 = [kWasmI32];
    let v25;
    try {
        v25 = makeSig(v22, v23);
    } catch(e49) {
    }
    let v26;
    try {
        v26 = builder.addType(v25);
    } catch(e53) {
    }
    let $sig5 = v26;
    try {
        builder.endRecGroup();
    } catch(e56) {
    }
    let v30;
    try {
        v30 = builder.addFunction(undefined, $sig5);
    } catch(e61) {
    }
    let callee_017 = v30;
    let v33;
    try {
        v33 = builder.addFunction(undefined, $sig5);
    } catch(e67) {
    }
    let callee_118 = v33;
    let v37;
    try {
        v37 = builder.addFunction(undefined, kSig_i_i);
    } catch(e74) {
    }
    let main22 = v37;
    let v41;
    try {
        v41 = builder.addMemory(0, 32);
    } catch(e81) {
    }
    let $mem0 = v41;
    let v47;
    try {
        v47 = wasmI32Const(0);
    } catch(e88) {
    }
    let v48;
    try {
        v48 = builder.addGlobal(kWasmI32, true, false, v47);
    } catch(e94) {
    }
    let $global0 = v48;
    let v51;
    try {
        v51 = wasmRefType($sig5);
    } catch(e100) {
    }
    const v56 = [kExprRefFunc,callee_017?.index];
    let v57;
    try {
        v57 = builder.addTable(v51, 2, 2, v56);
    } catch(e110) {
    }
    let $table0 = v57;
    const v59 = $table0?.index;
    let v61;
    try {
        v61 = wasmI32Const(0);
    } catch(e119) {
    }
    const v66 = [[kExprRefFunc,callee_017?.index],[kExprRefFunc,callee_118?.index]];
    let v67;
    try {
        v67 = wasmRefType($sig5);
    } catch(e130) {
    }
    let v68;
    try {
        v68 = builder.addActiveElementSegment(v59, v61, v66, v67);
    } catch(e134) {
    }
    let $segment0 = v68;
    const v78 = [kExprI32Const,1,kGCPrefix,kExprStructNew,$struct2,kGCPrefix,kExprStructGet,$struct2,0,kExprCallFunction,main22?.index];
    try {
        callee_017.addBody(v78);
    } catch(e147) {
    }
    const v86 = [kExprI32Const,0,kExprI32Const,0,kGCPrefix,kExprArrayNewDefault,$array4,kExprMemorySize,$mem0,kGCPrefix,kExprArrayGet,$array4,kExprI32DivS];
    try {
        callee_118.addBody(v86);
    } catch(e157) {
    }
    const v98 = [kExprLocalGet,0,kExprGlobalSet,$global0?.index,kExprGlobalGet,$global0?.index,kExprTableGet,$table0?.index,kGCPrefix,kExprRefCast,$sig5,kExprReturnCallRef,$sig5];
    try {
        main22.addBody(v98);
    } catch(e171) {
    }
    const v101 = main22?.index;
    try {
        builder.addExport("main", v101);
    } catch(e176) {
    }
    const v103 = {};
    let v104;
    try {
        v104 = builder.instantiate(v103);
    } catch(e182) {
    }
    const instance = v104;
    const v184 = () => {
        const v109 = instance?.exports;
        let v110;
        try {
            v110 = v109.main(0);
        } catch(e191) {
        }
        return v110;
    };
    const v107 = v184;
    try {
        f0(kTrapArrayOutOfBounds, v107);
    } catch(e195) {
    }
    const v198 = %WasmTierUpFunction(instance?.exports?.main);
    const v114 = v198;
} catch(e200) {
}
