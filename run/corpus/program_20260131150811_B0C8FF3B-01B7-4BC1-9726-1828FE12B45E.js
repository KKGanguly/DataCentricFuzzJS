try {
    try {
        try {
            function f0() {
            }
            const v3 = d8.file;
            try {
                try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
            } catch(e6) {
            }
            let v6;
            try {
                let v10;
                try { v10 = new WasmModuleBuilder(); } catch (e) {}
                v6 = v10;
            } catch(e11) {
            }
            const builder = v6;
            let v11;
            try {
                let v18;
                try { v18 = makeField(kWasmF32, false); } catch (e) {}
                v11 = v18;
            } catch(e19) {
            }
            let v14;
            try {
                let v25;
                try { v25 = makeField(kWasmAnyRef, false); } catch (e) {}
                v14 = v25;
            } catch(e26) {
            }
            let v17;
            try {
                let v31;
                try { v31 = wasmRefType(kWasmI31Ref); } catch (e) {}
                v17 = v31;
            } catch(e32) {
            }
            let v19;
            try {
                let v37;
                try { v37 = makeField(v17, false); } catch (e) {}
                v19 = v37;
            } catch(e38) {
            }
            let v22;
            try {
                let v44;
                try { v44 = makeField(kWasmI32, false); } catch (e) {}
                v22 = v44;
            } catch(e45) {
            }
            const v23 = [v11,v14,v19,v22];
            try {
                try { builder.addStruct(v23); } catch (e) {}
            } catch(e49) {
            }
            const v25 = [];
            try {
                try { builder.addStruct(v25); } catch (e) {}
            } catch(e53) {
            }
            const v27 = [];
            try {
                try { builder.addStruct(v27); } catch (e) {}
            } catch(e57) {
            }
            const v29 = [];
            try {
                try { builder.addStruct(v29); } catch (e) {}
            } catch(e61) {
            }
            try {
                try { builder.addArray(kWasmI32, true); } catch (e) {}
            } catch(e65) {
            }
            try {
                try { builder.addArray(kWasmI32, true); } catch (e) {}
            } catch(e69) {
            }
            const v35 = [kWasmI32,kWasmI32,kWasmI32];
            const v36 = [kWasmI32];
            let v38;
            try {
                let v78;
                try { v78 = makeSig(v35, v36); } catch (e) {}
                v38 = v78;
            } catch(e79) {
            }
            try {
                try { builder.addType(v38); } catch (e) {}
            } catch(e81) {
            }
            const v40 = [];
            const v41 = [];
            let v42;
            try {
                let v89;
                try { v89 = makeSig(v40, v41); } catch (e) {}
                v42 = v89;
            } catch(e90) {
            }
            try {
                try { builder.addType(v42); } catch (e) {}
            } catch(e92) {
            }
            const v44 = [];
            const v45 = [];
            let v46;
            try {
                let v100;
                try { v100 = makeSig(v44, v45); } catch (e) {}
                v46 = v100;
            } catch(e101) {
            }
            try {
                try { builder.addType(v46); } catch (e) {}
            } catch(e103) {
            }
            try {
                try { builder.addMemory(16, 32); } catch (e) {}
            } catch(e107) {
            }
            try {
                try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
            } catch(e113) {
            }
            let v59;
            try {
                let v118;
                try { v118 = wasmI32Const(0); } catch (e) {}
                v59 = v118;
            } catch(e119) {
            }
            const v67 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
            try {
                try { builder.addActiveElementSegment(0, v59, v67, kWasmFuncRef); } catch (e) {}
            } catch(e132) {
            }
            const v69 = [];
            const v70 = [];
            let v71;
            try {
                let v140;
                try { v140 = makeSig(v69, v70); } catch (e) {}
                v71 = v140;
            } catch(e141) {
            }
            try {
                try { builder.addTag(v71); } catch (e) {}
            } catch(e143) {
            }
            const v347 = [kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprTry,124,kExprF64Const,120,207,101,142,140,45,140,112,kExprCatch,0,kExprF64Const,234,152,28,56,104,192,61,140,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprF64Const,122,49,232,13,99,212,26,19,kExprF64Const,106,93,55,63,141,247,174,212,kExprF64Const,177,251,209,205,185,242,184,204,kExprF64CopySign,kExprF64CopySign,kExprLoop,124,kExprLoop,124,kExprF64Const,3,195,187,167,189,156,63,244,kExprEnd,kExprEnd,kExprF64CopySign,kExprF64Div,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprRefFunc,0,kExprCallFunction,2,kExprCallFunction,2,kExprF64Const,223,133,206,206,28,70,137,92,kExprI32Const,181,171,254,251,120,kExprI64Const,185,205,143,241,128,142,168,213,121,kExprI64StoreMem,0,144,32,kExprI32Const,159,129,182,181,121,kExprI64Const,172,178,213,194,159,203,181,148,101,kExprI64Const,161,173,175,160,200,201,139,240,125,kExprI64RemS,kExprI64StoreMem,2,144,32,kExprF64Const,22,30,229,170,17,64,4,189,kExprF64Const,188,30,114,34,70,74,9,76,kExprF64Const,54,249,253,119,29,13,147,206,kExprF64CopySign,kExprF64CopySign,kExprF64Const,29,36,61,207,239,142,226,170,kExprF64Const,95,206,237,70,65,228,156,149,kExprF64Div,kExprF64CopySign,kExprF64Div,kExprF64Const,129,3,190,50,20,115,232,164,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kExprRefNull,112,kExprI32Const,203,247,221,146,7,kNumericPrefix,kExprTableGrow,0,kExprI32Const,58,kExprI64Const,181,199,185,183,231,239,166,224,40,kAtomicPrefix,kExprI64AtomicExchange,0,184,112,kAtomicPrefix,kExprI64AtomicOr16U,1,184,112,kAtomicPrefix,kExprI64AtomicExchange,0,184,112,kExprF64ReinterpretI64,kNumericPrefix,kExprI32UConvertSatF64,kExprF64SConvertI32,kExprF64NearestInt,kNumericPrefix,kExprI32UConvertSatF64,kNumericPrefix,kExprTableGrow,0,kExprLocalTee,12,kExprF64SConvertI32,kExprEnd,kExprEnd,kExprEnd,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kGCPrefix,kExprRefI31,kGCPrefix,kExprRefCastNull,108,kGCPrefix,kExprRefCastNull,108,kGCPrefix,kExprRefCast,2,kExprLocalSet,4,kExprRefNull,110,kGCPrefix,kExprRefCast,2,kExprLocalSet,6,kGCPrefix,kExprStructNew,2,kExprLocalSet,7,kGCPrefix,kExprStructNew,2,kExprLocalSet,8,kGCPrefix,kExprStructNew,2,kExprLocalSet,9,kGCPrefix,kExprStructNew,2,kExprLocalSet,11,kExprI32Const,232,217,195,195,1,kExprI32Const,146,144,225,250,121,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,13,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,16,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,17,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,18,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,19,kGCPrefix,kExprStructNew,2,kExprLocalSet,21,kGCPrefix,kExprStructNew,2,kExprLocalSet,22,kGCPrefix,kExprStructNew,2,kExprLocalSet,23,kGCPrefix,kExprStructNew,2,kExprLocalSet,24,kGCPrefix,kExprStructNew,2,kExprLocalSet,25,kExprI32Const,159,163,204,197,7,kExprEnd];
            let v350;
            try {
                let v424;
                try { v424 = wasmRefNullType(0); } catch (e) {}
                v350 = v424;
            } catch(e425) {
            }
            let v353;
            try {
                let v430;
                try { v430 = wasmRefType(2); } catch (e) {}
                v353 = v430;
            } catch(e431) {
            }
            let v358;
            try {
                let v436;
                try { v436 = wasmRefType(kWasmExternRef); } catch (e) {}
                v358 = v436;
            } catch(e437) {
            }
            let v361;
            try {
                let v442;
                try { v442 = wasmRefNullType(0); } catch (e) {}
                v361 = v442;
            } catch(e443) {
            }
            let v364;
            try {
                let v448;
                try { v448 = wasmRefNullType(2); } catch (e) {}
                v364 = v448;
            } catch(e449) {
            }
            let v367;
            try {
                let v454;
                try { v454 = wasmRefType(kWasmArrayRef); } catch (e) {}
                v367 = v454;
            } catch(e455) {
            }
            let v371;
            try {
                let v460;
                try { v460 = wasmRefType(2); } catch (e) {}
                v371 = v460;
            } catch(e461) {
            }
            let v375;
            try {
                let v466;
                try { v466 = wasmRefType(2); } catch (e) {}
                v375 = v466;
            } catch(e467) {
            }
            let v379;
            try {
                let v472;
                try { v472 = wasmRefType(2); } catch (e) {}
                v379 = v472;
            } catch(e473) {
            }
            let v382;
            try {
                let v478;
                try { v478 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
                v382 = v478;
            } catch(e479) {
            }
            let v386;
            try {
                let v484;
                try { v484 = builder.addFunction(undefined, 6); } catch (e) {}
                v386 = v484;
            } catch(e485) {
            }
            let v387;
            try {
                let v489;
                try { v489 = v386.addLocals(v382, 1); } catch (e) {}
                v387 = v489;
            } catch(e490) {
            }
            let v388;
            try {
                let v494;
                try { v494 = v387.addLocals(v379, 1); } catch (e) {}
                v388 = v494;
            } catch(e495) {
            }
            let v389;
            try {
                let v500;
                try { v500 = v388.addLocals(kWasmF32, 1); } catch (e) {}
                v389 = v500;
            } catch(e501) {
            }
            let v390;
            try {
                let v505;
                try { v505 = v389.addLocals(v375, 4); } catch (e) {}
                v390 = v505;
            } catch(e506) {
            }
            let v391;
            try {
                let v510;
                try { v510 = v390.addLocals(kWasmI32, 1); } catch (e) {}
                v391 = v510;
            } catch(e511) {
            }
            let v392;
            try {
                let v515;
                try { v515 = v391.addLocals(v371, 1); } catch (e) {}
                v392 = v515;
            } catch(e516) {
            }
            let v393;
            try {
                let v520;
                try { v520 = v392.addLocals(kWasmI32, 1); } catch (e) {}
                v393 = v520;
            } catch(e521) {
            }
            let v394;
            try {
                let v525;
                try { v525 = v393.addLocals(v367, 1); } catch (e) {}
                v394 = v525;
            } catch(e526) {
            }
            let v395;
            try {
                let v530;
                try { v530 = v394.addLocals(v364, 1); } catch (e) {}
                v395 = v530;
            } catch(e531) {
            }
            let v396;
            try {
                let v535;
                try { v535 = v395.addLocals(v361, 1); } catch (e) {}
                v396 = v535;
            } catch(e536) {
            }
            let v397;
            try {
                let v540;
                try { v540 = v396.addLocals(v358, 4); } catch (e) {}
                v397 = v540;
            } catch(e541) {
            }
            let v398;
            try {
                let v546;
                try { v546 = v397.addLocals(kWasmI64, 1); } catch (e) {}
                v398 = v546;
            } catch(e547) {
            }
            let v399;
            try {
                let v551;
                try { v551 = v398.addLocals(v353, 5); } catch (e) {}
                v399 = v551;
            } catch(e552) {
            }
            let v400;
            try {
                let v556;
                try { v556 = v399.addLocals(v350, 1); } catch (e) {}
                v400 = v556;
            } catch(e557) {
            }
            try {
                try { v400.addBodyWithEnd(v347); } catch (e) {}
            } catch(e559) {
            }
            const v416 = [kGCPrefix,kExprStructNew,2,kExprLocalSet,1,kGCPrefix,kExprStructNew,2,kExprLocalSet,2,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,8,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,9,kGCPrefix,kExprStructNew,2,kExprLocalSet,10,kGCPrefix,kExprStructNew,2,kExprLocalSet,14,kGCPrefix,kExprStructNew,2,kExprLocalSet,15,kExprEnd];
            let v419;
            try {
                let v580;
                try { v580 = wasmRefType(2); } catch (e) {}
                v419 = v580;
            } catch(e581) {
            }
            let v422;
            try {
                let v586;
                try { v586 = wasmRefNullType(0); } catch (e) {}
                v422 = v586;
            } catch(e587) {
            }
            let v424;
            try {
                let v592;
                try { v592 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
                v424 = v592;
            } catch(e593) {
            }
            let v427;
            try {
                let v598;
                try { v598 = wasmRefType(2); } catch (e) {}
                v427 = v598;
            } catch(e599) {
            }
            let v429;
            try {
                let v604;
                try { v604 = wasmRefType(kWasmExternRef); } catch (e) {}
                v429 = v604;
            } catch(e605) {
            }
            let v432;
            try {
                let v610;
                try { v610 = wasmRefNullType(4); } catch (e) {}
                v432 = v610;
            } catch(e611) {
            }
            let v437;
            try {
                let v616;
                try { v616 = wasmRefNullType(1); } catch (e) {}
                v437 = v616;
            } catch(e617) {
            }
            let v442;
            try {
                let v622;
                try { v622 = wasmRefType(2); } catch (e) {}
                v442 = v622;
            } catch(e623) {
            }
            let v444;
            try {
                let v628;
                try { v628 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
                v444 = v628;
            } catch(e629) {
            }
            let v448;
            try {
                let v634;
                try { v634 = builder.addFunction(undefined, 7); } catch (e) {}
                v448 = v634;
            } catch(e635) {
            }
            let v449;
            try {
                let v639;
                try { v639 = v448.addLocals(v444, 1); } catch (e) {}
                v449 = v639;
            } catch(e640) {
            }
            let v450;
            try {
                let v644;
                try { v644 = v449.addLocals(v442, 2); } catch (e) {}
                v450 = v644;
            } catch(e645) {
            }
            let v451;
            try {
                let v650;
                try { v650 = v450.addLocals(kWasmF64, 1); } catch (e) {}
                v451 = v650;
            } catch(e651) {
            }
            let v452;
            try {
                let v655;
                try { v655 = v451.addLocals(kWasmI32, 1); } catch (e) {}
                v452 = v655;
            } catch(e656) {
            }
            let v453;
            try {
                let v660;
                try { v660 = v452.addLocals(v437, 1); } catch (e) {}
                v453 = v660;
            } catch(e661) {
            }
            let v454;
            try {
                let v666;
                try { v666 = v453.addLocals(kWasmF64, 1); } catch (e) {}
                v454 = v666;
            } catch(e667) {
            }
            let v455;
            try {
                let v671;
                try { v671 = v454.addLocals(v432, 1); } catch (e) {}
                v455 = v671;
            } catch(e672) {
            }
            let v456;
            try {
                let v676;
                try { v676 = v455.addLocals(v429, 2); } catch (e) {}
                v456 = v676;
            } catch(e677) {
            }
            let v457;
            try {
                let v681;
                try { v681 = v456.addLocals(v427, 1); } catch (e) {}
                v457 = v681;
            } catch(e682) {
            }
            let v458;
            try {
                let v686;
                try { v686 = v457.addLocals(v424, 1); } catch (e) {}
                v458 = v686;
            } catch(e687) {
            }
            let v459;
            try {
                let v691;
                try { v691 = v458.addLocals(v422, 2); } catch (e) {}
                v459 = v691;
            } catch(e692) {
            }
            let v460;
            try {
                let v696;
                try { v696 = v459.addLocals(v419, 2); } catch (e) {}
                v460 = v696;
            } catch(e697) {
            }
            let v461;
            try {
                let v701;
                try { v701 = v460.addLocals(kWasmI32, 4); } catch (e) {}
                v461 = v701;
            } catch(e702) {
            }
            try {
                try { v461.addBodyWithEnd(v416); } catch (e) {}
            } catch(e704) {
            }
            const v595 = [kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SubSatU,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprF32x4Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8AddSatS,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,...kExprF32x4Qfma,kExprI64Const,161,188,247,176,159,195,205,139,75,kExprI32ConvertI64,kSimdPrefix,kExprI16x8Shl,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI8x16GeU,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprF32x4Max,1,kSimdPrefix,kExprI16x8SubSatU,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SubSatU,1,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4AllTrue,1,kSimdPrefix,kExprI32x4Splat,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI8x16GeS,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4AllTrue,1,kExprF64Const,173,131,165,118,24,197,85,246,kExprF64Const,134,9,240,143,148,192,73,148,kExprF64Const,217,181,126,105,47,89,134,219,kExprF64Const,138,151,53,49,88,19,74,177,kExprF64Div,kExprF64Div,kExprF64Const,251,156,83,228,75,173,107,95,kExprF64Div,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kAtomicPrefix,kExprI32AtomicAdd8U,0,56,kExprIf,64,kExprI32Const,191,215,175,245,5,kExprI32Const,250,140,143,207,124,kExprI32Const,226,146,236,247,124,kExprRefFunc,0,kExprCallRef,6,kExprDrop,kExprEnd,kExprEnd];
            let v598;
            try {
                let v843;
                try { v843 = builder.addFunction(undefined, 8); } catch (e) {}
                v598 = v843;
            } catch(e844) {
            }
            try {
                try { v598.addBodyWithEnd(v595); } catch (e) {}
            } catch(e846) {
            }
            try {
                try { builder.addExport("main", 0); } catch (e) {}
            } catch(e850) {
            }
            let v603;
            try {
                let v853;
                try { v853 = builder.instantiate(); } catch (e) {}
                v603 = v853;
            } catch(e854) {
            }
            const instance = v603;
            try {
                const v608 = instance?.exports;
                let v609;
                try {
                    let v863;
                    try { v863 = v608.main(1, 2, 3); } catch (e) {}
                    v609 = v863;
                } catch(e864) {
                }
                try {
                    try { f0(v609); } catch (e) {}
                } catch(e866) {
                }
            } catch(e867) {
                try {
                    try { f0("caught exception", e867); } catch (e) {}
                } catch(e870) {
                }
            }
        } catch(e871) {
        }
    } catch(e872) {
    }
} catch(e873) {
}
