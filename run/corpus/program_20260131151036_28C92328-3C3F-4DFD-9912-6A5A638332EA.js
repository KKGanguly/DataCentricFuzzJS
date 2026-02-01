function MjsUnitAssertionError(a1) {
    this.message = a1;
    let v5;
    try {
        const v7 = new Error("");
        v5 = v7;
    } catch(e8) {
    }
    this.stack = v5?.stack;
}
function f8() {
    return this?.message;
}
const t9 = MjsUnitAssertionError.prototype;
t9.toString = f8;
var assertSame;
var assertEquals;
var assertArrayEquals;
var assertPropertiesEqual;
var assertToStringEquals;
var assertTrue;
var assertFalse;
var assertNull;
var assertNotNull;
var assertThrows;
var assertDoesNotThrow;
var assertInstanceof;
var assertUnreachable;
function f38() {
    function classOf(a44) {
        const v43 = Object?.prototype?.toString;
        let v44;
        try {
            v44 = v43.call(a44);
        } catch(e52) {
        }
        var string = v44;
        const v49 = string?.length - 1;
        let v50;
        try {
            v50 = string.substring(8, v49);
        } catch(e62) {
        }
        return v50;
    }
    function PrettyPrint(a64) {
        switch (typeof a64) {
            case "string":
                let v61;
                try {
                    v61 = JSON.stringify(a64);
                } catch(e76) {
                }
                return v61;
            case "number":
                if ((a64 === 0) && ((1 / a64) < 0)) {
                    return "-0";
                }
            case "boolean":
            case "undefined":
            case "function":
                let v71;
                try {
                    v71 = String(a64);
                } catch(e89) {
                }
                return v71;
            case "object":
                if (a64 === null) {
                    return "null";
                }
                let v75;
                try {
                    v75 = classOf(a64);
                } catch(e96) {
                }
                var objectClass = v75;
                switch (objectClass) {
                    case "Number":
                    case "String":
                    case "Boolean":
                    case "Date":
                        const v85 = objectClass + "(";
                        let v86;
                        try {
                            v86 = a64.valueOf();
                        } catch(e111) {
                        }
                        let v87;
                        try {
                            v87 = PrettyPrint(v86);
                        } catch(e115) {
                        }
                        return (v85 + v87) + ")";
                    case "RegExp":
                        let v91;
                        try {
                            v91 = a64.toString();
                        } catch(e122) {
                        }
                        return v91;
                    case "Array":
                        let v95;
                        try {
                            v95 = a64.map(PrettyPrintArrayElement);
                        } catch(e127) {
                        }
                        let v96;
                        try {
                            v96 = v95.join(",");
                        } catch(e132) {
                        }
                        return ("[" + v96) + "]";
                    case "Object":
                        break;
                    default:
                        return objectClass + "()";
                }
                var name = a64?.constructor?.name;
                if (name) {
                    return name + "()";
                }
                return "Object()";
            default:
                return "-- unknown value --";
        }
    }
    function PrettyPrintArrayElement(a147, a148, a149) {
        if ((a147 === undefined) && !(a148 in a149)) {
            return "";
        }
        let v119;
        try {
            v119 = PrettyPrint(a147);
        } catch(e159) {
        }
        return v119;
    }
    function fail(a161, a162, a163) {
        var message = "Fail" + "ure";
        if (a163) {
            message += (" (" + a163) + ")";
        }
        const v135 = (": expected <" + a161) + "> found <";
        let v136;
        try {
            v136 = PrettyPrint(a162);
        } catch(e180) {
        }
        message += (v135 + v136) + ">";
        let v140;
        try {
            const v186 = new MjsUnitAssertionError(message);
            v140 = v186;
        } catch(e187) {
        }
        throw v140;
    }
    function deepObjectEquals(a189, a190) {
        let v145;
        try {
            v145 = Object.keys(a189);
        } catch(e195) {
        }
        var aProps = v145;
        try {
            aProps.sort();
        } catch(e198) {
        }
        let v148;
        try {
            v148 = Object.keys(a190);
        } catch(e203) {
        }
        var bProps = v148;
        try {
            bProps.sort();
        } catch(e206) {
        }
        let v152;
        try {
            v152 = deepEquals(aProps, bProps);
        } catch(e211) {
        }
        if (!v152) {
            return false;
        }
        for (let i215 = 0; i215 < aProps?.length; i215++) {
            aProps?.[aProps];
            const v163 = a189?.[a189];
            aProps?.[aProps];
            const v165 = a190?.[a190];
            let v166;
            try {
                v166 = deepEquals(v163, v165);
            } catch(e231) {
            }
            if (!v166) {
                return false;
            }
        }
        return true;
    }
    function deepEquals(a236, a237) {
        if (a236 === a237) {
            if (a236 === 0) {
                return (1 / a236) === (1 / a237);
            }
            return true;
        }
        if (typeof a236 != typeof a237) {
            return false;
        }
        if (typeof a236 == "number") {
            let v190;
            try {
                v190 = isNaN(a236);
            } catch(e258) {
            }
            let v191;
            try {
                v191 = isNaN(a237);
            } catch(e263) {
            }
            return v190 && v191;
        }
        if ((typeof a236 !== "object") && (typeof a236 !== "function")) {
            return false;
        }
        let v201;
        try {
            v201 = classOf(a236);
        } catch(e276) {
        }
        var objectClass = v201;
        let v203;
        try {
            v203 = classOf(a237);
        } catch(e281) {
        }
        if (objectClass !== v203) {
            return false;
        }
        if (objectClass === "RegExp") {
            let v208;
            try {
                v208 = a236.toString();
            } catch(e289) {
            }
            let v209;
            try {
                v209 = a237.toString();
            } catch(e293) {
            }
            return v208 === v209;
        }
        if (objectClass === "Function") {
            return false;
        }
        if (objectClass === "Array") {
            var elementCount = 0;
            if (a236?.length != a237?.length) {
                return false;
            }
            for (let i307 = 0; i307 < a236?.length; i307++) {
                const v229 = a236?.[a236];
                const v230 = a237?.[a237];
                let v231;
                try {
                    v231 = deepEquals(v229, v230);
                } catch(e320) {
                }
                if (!v231) {
                    return false;
                }
            }
            return true;
        }
        if ((((objectClass == "String") || (objectClass == "Number")) || (objectClass == "Boolean")) || (objectClass == "Date")) {
            let v246;
            try {
                v246 = a236.valueOf();
            } catch(e338) {
            }
            let v247;
            try {
                v247 = a237.valueOf();
            } catch(e342) {
            }
            if (v246 !== v247) {
                return false;
            }
        }
        let v250;
        try {
            v250 = deepObjectEquals(a236, a237);
        } catch(e348) {
        }
        return v250;
    }
    function assertSame(a350, a351, a352) {
        if (a351 === a350) {
            if ((a350 !== 0) || ((1 / a350) == (1 / a351))) {
                return;
            }
        } else {
            let v265;
            try {
                v265 = isNaN(a350);
            } catch(e366) {
            }
            let v266;
            try {
                v266 = isNaN(a351);
            } catch(e371) {
            }
            if (v265 && v266) {
                return;
            }
        }
        let v268;
        try {
            v268 = PrettyPrint(a350);
        } catch(e376) {
        }
        try {
            fail(v268, a351, a352);
        } catch(e378) {
        }
    }
    assertSame = assertSame;
    function assertEquals(a380, a381, a382) {
        let v274;
        try {
            v274 = deepEquals(a381, a380);
        } catch(e386) {
        }
        if (!v274) {
            let v276;
            try {
                v276 = PrettyPrint(a380);
            } catch(e391) {
            }
            try {
                fail(v276, a381, a382);
            } catch(e393) {
            }
        }
    }
    assertEquals = assertEquals;
    function assertArrayEquals(a395, a396, a397) {
        var start = "";
        if (a397) {
            start = a397 + " - ";
        }
        const v286 = a395?.length;
        const v287 = a396?.length;
        const v289 = start + "array length";
        try {
            assertEquals(v286, v287, v289);
        } catch(e410) {
        }
        if (a395?.length == a396?.length) {
            for (let i415 = 0; i415 < a395?.length; ++i415) {
                const v301 = a395?.[a395];
                const v302 = a396?.[a396];
                const v305 = (start + "array element at index ") + i415;
                try {
                    assertEquals(v301, v302, v305);
                } catch(e430) {
                }
            }
        }
    }
    assertArrayEquals = assertArrayEquals;
    function assertPropertiesEqual(a432, a433, a434) {
        let v311;
        try {
            v311 = deepObjectEquals(a432, a433);
        } catch(e438) {
        }
        if (!v311) {
            try {
                fail(a432, a433, a434);
            } catch(e441) {
            }
        }
    }
    assertPropertiesEqual = assertPropertiesEqual;
    function assertToStringEquals(a443, a444, a445) {
        let v319;
        try {
            v319 = String(a444);
        } catch(e450) {
        }
        if (a443 != v319) {
            try {
                fail(a443, a444, a445);
            } catch(e453) {
            }
        }
    }
    assertToStringEquals = assertToStringEquals;
    function assertTrue(a455, a456) {
        try {
            assertEquals(true, a455, a456);
        } catch(e459) {
        }
    }
    assertTrue = assertTrue;
    function assertFalse(a461, a462) {
        try {
            assertEquals(false, a461, a462);
        } catch(e465) {
        }
    }
    assertFalse = assertFalse;
    function assertNull(a467, a468) {
        if (a467 !== null) {
            try {
                fail("null", a467, a468);
            } catch(e473) {
            }
        }
    }
    assertNull = assertNull;
    function assertNotNull(a475, a476) {
        if (a475 === null) {
            try {
                fail("not null", a475, a476);
            } catch(e481) {
            }
        }
    }
    assertNotNull = assertNotNull;
    function assertThrows(a483, a484, a485) {
        var threwException = true;
        try {
            if (typeof a483 == "function") {
                try {
                    a483();
                } catch(e492) {
                }
            } else {
                try {
                    eval(a483);
                } catch(e495) {
                }
            }
            threwException = false;
        } catch(e497) {
            if (typeof a484 == "function") {
                try {
                    assertInstanceof(e497, a484);
                } catch(e502) {
                }
            }
            if (arguments?.length >= 3) {
                const v368 = e497?.type;
                try {
                    assertEquals(v368, a485);
                } catch(e510) {
                }
            }
            return;
        }
        let v371;
        try {
            const v514 = new MjsUnitAssertionError("Did not throw exception");
            v371 = v514;
        } catch(e515) {
        }
        throw v371;
    }
    assertThrows = assertThrows;
    function assertInstanceof(a517, a518) {
        if (!(a517 instanceof a518)) {
            var actualTypeName = null;
            let v380;
            try {
                v380 = Object.prototypeOf(a517);
            } catch(e527) {
            }
            var actualConstructor = v380?.constructor;
            if (typeof actualConstructor == "function") {
                const v386 = actualConstructor?.name;
                let v388;
                try {
                    v388 = String(actualConstructor);
                } catch(e539) {
                }
                actualTypeName = v386 || v388;
            }
            let v391;
            try {
                v391 = PrettyPrint(a517);
            } catch(e544) {
            }
            const v406 = (((("Object <" + v391) + "> is not an instance of <") + (a518?.name || a518)) + ">") + (actualTypeName ? (" but of < " + actualTypeName) + ">" : "");
            try {
                fail(v406);
            } catch(e563) {
            }
        }
    }
    assertInstanceof = assertInstanceof;
    function assertDoesNotThrow(a565, a566) {
        try {
            if (typeof a565 == "function") {
                try {
                    a565();
                } catch(e571) {
                }
            } else {
                try {
                    eval(a565);
                } catch(e574) {
                }
            }
        } catch(e575) {
            const v420 = e575?.message || e575;
            try {
                fail("threw an exception: ", v420, a566);
            } catch(e581) {
            }
        }
    }
    assertDoesNotThrow = assertDoesNotThrow;
    function assertUnreachable(a583) {
        var message = "Fail" + "ure: unreachable";
        if (a583) {
            message += " - " + a583;
        }
        let v430;
        try {
            const v592 = new MjsUnitAssertionError(message);
            v430 = v592;
        } catch(e593) {
        }
        throw v430;
    }
    assertUnreachable = assertUnreachable;
}
f38();
try {
    function testMethodNameInference() {
        function Foo() {
        }
        function f434() {
        }
        const t366 = Foo.prototype;
        t366.bar = f434;
        const v600 = new Foo();
        const v437 = v600;
        v437.bar();
    }
    function testNested() {
        function one() {
            function two() {
                function three() {
                }
                three();
            }
            two();
        }
        one();
    }
    function testArrayNative() {
        function f448() {
            let v450;
            try {
                v450 = one.two();
            } catch(e616) {
            }
            let v451;
            try {
                v451 = v450.map();
            } catch(e620) {
            }
            const v453 = one?.two?.testNested;
            try {
                three(v451, v453, "Unexpected constructor function handle in JSON");
            } catch(e628) {
            }
        }
        const v460 = [1,2,3];
        try {
            v460.map(f448);
        } catch(e635) {
        }
    }
    function testImplicitConversion() {
        function Nirk() {
        }
        function f464() {
        }
        const t399 = Nirk.prototype;
        t399.valueOf = f464;
        const v641 = new Nirk();
        const v468 = v641;
        return 1 + v468;
    }
    function testEval() {
        try {
            eval("function Doo() { FAIL; }; Doo();");
        } catch(e649) {
        }
    }
    function testNestedEval() {
        var x = "FAIL";
        try {
            eval("function Outer() { eval('function Inner() { eval(x); }'); Inner(); }; Outer();");
        } catch(e656) {
        }
    }
    function testEvalWithSourceURL() {
        try {
            eval("function Doo() { FAIL; }; Doo();\n//@ sourceURL=res://name");
        } catch(e661) {
        }
    }
    function testNestedEvalWithSourceURL() {
        var x = "FAIL";
        var innerEval = "function Inner() { eval(x); }\n//@ sourceURL=res://inner-eval";
        try {
            eval("function Outer() { eval(innerEval); Inner(); }; Outer();\n//@ sourceURL=res://outer-eval");
        } catch(e670) {
        }
    }
    function testValue() {
        function f493() {
        }
        const t422 = Number.prototype;
        t422.causeError = f493;
        (1).causeError();
    }
    function testConstructor() {
        function Plonk() {
        }
        new Plonk();
    }
    function testRenamedMethod() {
        function a$b$c$d() {
            return FAIL;
        }
        function Wookie() {
        }
        const t437 = Wookie.prototype;
        t437.d = a$b$c$d;
        const v687 = new Wookie();
        const v508 = v687;
        try {
            v508.d();
        } catch(e690) {
        }
    }
    function testAnonymousMethod() {
        const v514 = [1,2,3];
        function f515() {
        }
        f515.call(v514);
    }
    function CustomError(a700, a701) {
        this.message = a700;
        Error.captureStackTrace(this, a701);
    }
    function f525() {
        return "CustomError: " + this?.message;
    }
    const t455 = CustomError.prototype;
    t455.toString = f525;
    function testDefaultCustomError() {
        const v716 = new CustomError("hep-hey", undefined);
        const v534 = v716;
        throw v534;
    }
    function testStrippedCustomError() {
        const v720 = new CustomError("hep-hey", CustomError);
        const v537 = v720;
        throw v537;
    }
    function testTrace(a723, a724, a725, a726) {
        var threw = false;
        try {
            try {
                a724();
            } catch(e730) {
            }
        } catch(e731) {
            for (let i733 = 0; i733 < a725?.length; i733++) {
                const v554 = a725?.[a725];
                const v555 = e731?.stack;
                let v556;
                try {
                    v556 = v555.indexOf(v554);
                } catch(e746) {
                }
                const v559 = v556 != -1;
                const v566 = (((a723 + " doesn't contain expected[") + i733) + "] stack = ") + e731?.stack;
                try {
                    assertTrue(v559, v566);
                } catch(e760) {
                }
            }
            if (a726) {
                for (let i762 = 0; i762 < a726?.length; i762++) {
                    function i(a769) {
                    }
                    var message;
                    var length;
                    function stack(a775) {
                        if (a775) {
                            message = arguments;
                        } else {
                            length = arguments;
                            const v589 = arguments - 1901;
                            let v590;
                            try {
                                v590 = v589("o");
                            } catch(e786) {
                            }
                            try {
                                message.watch(0, v590);
                            } catch(e789) {
                            }
                            let v594;
                            try {
                                v594 = i("p");
                            } catch(e794) {
                            }
                            try {
                                length.watch(0, v594);
                            } catch(e797) {
                            }
                            try {
                                length.unwatch(0);
                            } catch(e800) {
                            }
                            try {
                                message.unwatch(0);
                            } catch(e803) {
                            }
                            length[0] = 4;
                            try {
                                message(a775, 4);
                            } catch(e807) {
                            }
                        }
                    }
                    try {
                        stack(true);
                    } catch(e810) {
                    }
                    try {
                        stack(false);
                    } catch(e813) {
                    }
                    try {
                        FAIL(true, true);
                    } catch(e818) {
                    }
                }
            }
            threw = true;
        }
        const v613 = a723 + " didn't throw";
        try {
            assertTrue(threw, v613);
        } catch(e824) {
        }
    }
    function testCallerCensorship() {
        var threw = false;
        try {
        } catch(e828) {
            const v621 = -1;
            const v623 = e828?.stack;
            let v624;
            try {
                v624 = v623.indexOf("at new ReferenceError");
            } catch(e838) {
            }
            try {
                assertEquals(v621, v624, "CallerCensorship contained new ReferenceError");
            } catch(e841) {
            }
            threw = true;
        }
        try {
            assertTrue(threw, "CallerCensorship didn't throw");
        } catch(e845) {
        }
    }
    function testUnintendedCallerCensorship() {
        var threw = false;
        try {
            function f634() {
            }
            new ReferenceError({ toString: f634 });
        } catch(e853) {
            const v640 = e853?.stack;
            let v641;
            try {
                v641 = v640.indexOf("at new ReferenceError");
            } catch(e860) {
            }
            const v644 = v641 != -1;
            try {
                assertTrue(v644, "UnintendedCallerCensorship didn't contain new ReferenceError");
            } catch(e867) {
            }
            threw = true;
        }
        try {
            assertTrue(threw, "UnintendedCallerCensorship didn't throw");
        } catch(e871) {
        }
    }
    function testErrorsDuringFormatting() {
        function Nasty() {
        }
        function f652() {
            const v876 = new RangeError();
            const v654 = v876;
            throw v654;
        }
        const t549 = Nasty.prototype;
        t549.foo = f652;
        const v880 = new Nasty();
        const v656 = v880;
        var n = v656;
        function f659() {
        }
        n.__defineGetter__("constructor", f659);
        var threw = false;
        try {
            try {
                n.foo();
            } catch(e889) {
            }
        } catch(e890) {
            threw = true;
            const v668 = e890?.stack;
            let v669;
            try {
                v669 = v668.indexOf("<error: ReferenceError");
            } catch(e898) {
            }
            const v672 = v669 != -1;
            try {
                assertTrue(v672, "ErrorsDuringFormatting didn't contain error: ReferenceError");
            } catch(e905) {
            }
        }
        try {
            assertTrue(threw, "ErrorsDuringFormatting didn't throw");
        } catch(e908) {
        }
        threw = false;
        const t569 = ReferenceError.prototype;
        t569.toString = a$b$c$d;
        try {
            try {
                n.foo();
            } catch(e915) {
            }
        } catch(e916) {
            threw = true;
            const v685 = e916?.stack;
            let v686;
            try {
                v686 = v685.indexOf("<error>");
            } catch(e924) {
            }
            const v689 = v686 != -1;
            try {
                assertTrue(v689, "ErrorsDuringFormatting didn't contain <error>");
            } catch(e931) {
            }
        }
        try {
            assertTrue(threw, "ErrorsDuringFormatting didnt' throw (2)");
        } catch(e934) {
        }
    }
    testTrace("testArrayNative", testArrayNative, ["Array.map (native)"]);
    testTrace("testNested", testNested, ["at one","at two","at three"]);
    testTrace("testMethodNameInference", testMethodNameInference, ["at Foo.bar"]);
    testTrace("testImplicitConversion", testImplicitConversion, ["at Nirk.valueOf"]);
    testTrace("testEval", testEval, ["at Doo (eval at testEval"]);
    testTrace("testNestedEval", testNestedEval, ["eval at Inner (eval at Outer"]);
    testTrace("testEvalWithSourceURL", testEvalWithSourceURL, ["at Doo (res://name:1:18)"]);
    testTrace("testNestedEvalWithSourceURL", testNestedEvalWithSourceURL, [" at Inner (res://inner-eval:1:20)"," at Outer (res://outer-eval:1:37)"]);
    testTrace("testValue", testValue, ["at Number.causeError"]);
    testTrace("testConstructor", testConstructor, ["new Plonk"]);
    testTrace("testRenamedMethod", testRenamedMethod, ["Wookie.a$b$c$d [as d]"]);
    testTrace("testAnonymousMethod", testAnonymousMethod, ["Array.<anonymous>"]);
    testTrace("testDefaultCustomError", testDefaultCustomError, ["hep-hey","new CustomError"], ["collectStackTrace"]);
    testTrace("testStrippedCustomError", testStrippedCustomError, ["hep-hey"], ["new CustomError","collectStackTrace"]);
    testCallerCensorship();
    testUnintendedCallerCensorship();
    try {
        testErrorsDuringFormatting();
    } catch(e1003) {
    }
} catch(e1004) {
}
var regexp = /a(b)(c)/;
var subject = "xyzabcde";
var expected = "abc,b,c";
const v771 = String(regexp.exec(subject));
try {
    assertEquals(expected, v771);
} catch(e1016) {
}
function f773() {
    try {
        regexp(subject);
    } catch(e1019) {
    }
}
try {
    assertThrows(f773);
} catch(e1021) {
}
