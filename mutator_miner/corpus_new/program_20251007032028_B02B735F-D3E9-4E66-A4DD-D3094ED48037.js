function MjsUnitAssertionError(a1) {
    this.message = a1;
    let v5;
    try { v5 = new Error(""); } catch (e) {}
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
    function classOf(a40) {
        const v43 = Object?.prototype?.toString;
        let v44;
        try { v44 = v43.call(a40); } catch (e) {}
        var string = v44;
        const v49 = string?.length - 1;
        let v50;
        try { v50 = string.substring(8, v49); } catch (e) {}
        return v50;
    }
    function PrettyPrint(a52) {
        switch (typeof a52) {
            case "string":
                let v61;
                try { v61 = JSON.stringify(a52); } catch (e) {}
                return v61;
            case "number":
                if ((a52 === 0) && ((1 / a52) < 0)) {
                    return "-0";
                }
            case "boolean":
            case "undefined":
            case "function":
                let v71;
                try { v71 = String(a52); } catch (e) {}
                return v71;
            case "object":
                if (a52 === null) {
                    return "null";
                }
                let v75;
                try { v75 = classOf(a52); } catch (e) {}
                var objectClass = v75;
                switch (objectClass) {
                    case "Number":
                    case "String":
                    case "Boolean":
                    case "Date":
                        const v85 = objectClass + "(";
                        let v86;
                        try { v86 = a52.valueOf(); } catch (e) {}
                        let v87;
                        try { v87 = PrettyPrint(v86); } catch (e) {}
                        return (v85 + v87) + ")";
                    case "RegExp":
                        let v91;
                        try { v91 = a52.toString(); } catch (e) {}
                        return v91;
                    case "Array":
                        let v95;
                        try { v95 = a52.map(PrettyPrintArrayElement); } catch (e) {}
                        let v96;
                        try { v96 = v95.join(","); } catch (e) {}
                        return ("[" + v96) + "]";
                    case "Object":
                        break;
                    default:
                        return objectClass + "()";
                }
                var name = a52?.constructor?.name;
                if (name) {
                    return name + "()";
                }
                return "Object()";
            default:
                return "-- unknown value --";
        }
    }
    function PrettyPrintArrayElement(a110, a111, a112) {
        if ((a110 === undefined) && !(a111 in a112)) {
            return "";
        }
        let v119;
        try { v119 = PrettyPrint(a110); } catch (e) {}
        return v119;
    }
    function fail(a121, a122, a123) {
        var message = "Fail" + "ure";
        if (a123) {
            message += (" (" + a123) + ")";
        }
        const v135 = (": expected <" + a121) + "> found <";
        let v136;
        try { v136 = PrettyPrint(a122); } catch (e) {}
        message += (v135 + v136) + ">";
        let v140;
        try { v140 = new MjsUnitAssertionError(message); } catch (e) {}
        throw v140;
    }
    function deepObjectEquals(a142, a143) {
        let v145;
        try { v145 = Object.keys(a142); } catch (e) {}
        var aProps = v145;
        try { aProps.sort(); } catch (e) {}
        let v148;
        try { v148 = Object.keys(a143); } catch (e) {}
        var bProps = v148;
        try { bProps.sort(); } catch (e) {}
        let v152;
        try { v152 = deepEquals(aProps, bProps); } catch (e) {}
        if (!v152) {
            return false;
        }
        for (let i156 = 0; i156 < aProps?.length; i156++) {
            aProps?.[aProps];
            const v163 = a142?.[a142];
            aProps?.[aProps];
            const v165 = a143?.[a143];
            let v166;
            try { v166 = deepEquals(v163, v165); } catch (e) {}
            if (!v166) {
                return false;
            }
        }
        return true;
    }
    function deepEquals(a171, a172) {
        if (a171 === a172) {
            if (a171 === 0) {
                return (1 / a171) === (1 / a172);
            }
            return true;
        }
        if (typeof a171 != typeof a172) {
            return false;
        }
        if (typeof a171 == "number") {
            let v190;
            try { v190 = isNaN(a171); } catch (e) {}
            let v191;
            try { v191 = isNaN(a172); } catch (e) {}
            return v190 && v191;
        }
        if ((typeof a171 !== "object") && (typeof a171 !== "function")) {
            return false;
        }
        let v201;
        try { v201 = classOf(a171); } catch (e) {}
        var objectClass = v201;
        let v203;
        try { v203 = classOf(a172); } catch (e) {}
        if (objectClass !== v203) {
            return false;
        }
        if (objectClass === "RegExp") {
            let v208;
            try { v208 = a171.toString(); } catch (e) {}
            let v209;
            try { v209 = a172.toString(); } catch (e) {}
            return v208 === v209;
        }
        if (objectClass === "Function") {
            return false;
        }
        if (objectClass === "Array") {
            var elementCount = 0;
            if (a171?.length != a172?.length) {
                return false;
            }
            for (let i223 = 0; i223 < a171?.length; i223++) {
                const v229 = a171?.[a171];
                const v230 = a172?.[a172];
                let v231;
                try { v231 = deepEquals(v229, v230); } catch (e) {}
                if (!v231) {
                    return false;
                }
            }
            return true;
        }
        if ((((objectClass == "String") || (objectClass == "Number")) || (objectClass == "Boolean")) || (objectClass == "Date")) {
            let v246;
            try { v246 = a171.valueOf(); } catch (e) {}
            let v247;
            try { v247 = a172.valueOf(); } catch (e) {}
            if (v246 !== v247) {
                return false;
            }
        }
        let v250;
        try { v250 = deepObjectEquals(a171, a172); } catch (e) {}
        return v250;
    }
    function assertSame(a252, a253, a254) {
        if (a253 === a252) {
            if ((a252 !== 0) || ((1 / a252) == (1 / a253))) {
                return;
            }
        } else {
            let v265;
            try { v265 = isNaN(a252); } catch (e) {}
            let v266;
            try { v266 = isNaN(a253); } catch (e) {}
            if (v265 && v266) {
                return;
            }
        }
        let v268;
        try { v268 = PrettyPrint(a252); } catch (e) {}
        try { fail(v268, a253, a254); } catch (e) {}
    }
    assertSame = assertSame;
    function assertEquals(a271, a272, a273) {
        let v274;
        try { v274 = deepEquals(a272, a271); } catch (e) {}
        if (!v274) {
            let v276;
            try { v276 = PrettyPrint(a271); } catch (e) {}
            try { fail(v276, a272, a273); } catch (e) {}
        }
    }
    assertEquals = assertEquals;
    function assertArrayEquals(a279, a280, a281) {
        var start = "";
        if (a281) {
            start = a281 + " - ";
        }
        const v286 = a279?.length;
        const v287 = a280?.length;
        const v289 = start + "array length";
        try { assertEquals(v286, v287, v289); } catch (e) {}
        if (a279?.length == a280?.length) {
            for (let i295 = 0; i295 < a279?.length; ++i295) {
                const v301 = a279?.[a279];
                const v302 = a280?.[a280];
                const v305 = (start + "array element at index ") + i295;
                try { assertEquals(v301, v302, v305); } catch (e) {}
            }
        }
    }
    assertArrayEquals = assertArrayEquals;
    function assertPropertiesEqual(a308, a309, a310) {
        let v311;
        try { v311 = deepObjectEquals(a308, a309); } catch (e) {}
        if (!v311) {
            try { fail(a308, a309, a310); } catch (e) {}
        }
    }
    assertPropertiesEqual = assertPropertiesEqual;
    function assertToStringEquals(a315, a316, a317) {
        let v319;
        try { v319 = String(a316); } catch (e) {}
        if (a315 != v319) {
            try { fail(a315, a316, a317); } catch (e) {}
        }
    }
    assertToStringEquals = assertToStringEquals;
    function assertTrue(a323, a324) {
        try { assertEquals(true, a323, a324); } catch (e) {}
    }
    assertTrue = assertTrue;
    function assertFalse(a328, a329) {
        try { assertEquals(false, a328, a329); } catch (e) {}
    }
    assertFalse = assertFalse;
    function assertNull(a333, a334) {
        if (a333 !== null) {
            try { fail("null", a333, a334); } catch (e) {}
        }
    }
    assertNull = assertNull;
    function assertNotNull(a340, a341) {
        if (a340 === null) {
            try { fail("not null", a340, a341); } catch (e) {}
        }
    }
    assertNotNull = assertNotNull;
    function assertThrows(a347, a348, a349) {
        var threwException = true;
        try {
            if (typeof a347 == "function") {
                try { a347(); } catch (e) {}
            } else {
                try { eval(a347); } catch (e) {}
            }
            threwException = false;
        } catch(e359) {
            if (typeof a348 == "function") {
                try { assertInstanceof(e359, a348); } catch (e) {}
            }
            if (arguments?.length >= 3) {
                const v368 = e359?.type;
                try { assertEquals(v368, a349); } catch (e) {}
            }
            return;
        }
        let v371;
        try { v371 = new MjsUnitAssertionError("Did not throw exception"); } catch (e) {}
        throw v371;
    }
    assertThrows = assertThrows;
    function assertInstanceof(a373, a374) {
        if (!(a373 instanceof a374)) {
            var actualTypeName = null;
            let v380;
            try { v380 = Object.prototypeOf(a373); } catch (e) {}
            var actualConstructor = v380?.constructor;
            if (typeof actualConstructor == "function") {
                const v386 = actualConstructor?.name;
                let v388;
                try { v388 = String(actualConstructor); } catch (e) {}
                actualTypeName = v386 || v388;
            }
            let v391;
            try { v391 = PrettyPrint(a373); } catch (e) {}
            const v406 = (((("Object <" + v391) + "> is not an instance of <") + (a374?.name || a374)) + ">") + (actualTypeName ? (" but of < " + actualTypeName) + ">" : "");
            try { fail(v406); } catch (e) {}
        }
    }
    assertInstanceof = assertInstanceof;
    function assertDoesNotThrow(a409, a410) {
        try {
            if (typeof a409 == "function") {
                try { a409(); } catch (e) {}
            } else {
                try { eval(a409); } catch (e) {}
            }
        } catch(e417) {
            const v420 = e417?.message || e417;
            try { fail("threw an exception: ", v420, a410); } catch (e) {}
        }
    }
    assertDoesNotThrow = assertDoesNotThrow;
    function assertUnreachable(a423) {
        var message = "Fail" + "ure: unreachable";
        if (a423) {
            message += " - " + a423;
        }
        let v430;
        try { v430 = new MjsUnitAssertionError(message); } catch (e) {}
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
        const v437 = new Foo();
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
            try { v450 = one.two(); } catch (e) {}
            let v451;
            try { v451 = v450.map(); } catch (e) {}
            const v453 = one?.two?.testNested;
            try { three(v451, v453, "Unexpected constructor function handle in JSON"); } catch (e) {}
        }
        const v460 = [1,2,3];
        try { v460.map(f448); } catch (e) {}
    }
    function testImplicitConversion() {
        function Nirk() {
        }
        function f464() {
        }
        const t399 = Nirk.prototype;
        t399.valueOf = f464;
        const v468 = new Nirk();
        return 1 + v468;
    }
    function testEval() {
        try { eval("function Doo() { FAIL; }; Doo();"); } catch (e) {}
    }
    function testNestedEval() {
        var x = "FAIL";
        try { eval("function Outer() { eval('function Inner() { eval(x); }'); Inner(); }; Outer();"); } catch (e) {}
    }
    function testEvalWithSourceURL() {
        try { eval("function Doo() { FAIL; }; Doo();\n//@ sourceURL=res://name"); } catch (e) {}
    }
    function testNestedEvalWithSourceURL() {
        var x = "FAIL";
        var innerEval = "function Inner() { eval(x); }\n//@ sourceURL=res://inner-eval";
        try { eval("function Outer() { eval(innerEval); Inner(); }; Outer();\n//@ sourceURL=res://outer-eval"); } catch (e) {}
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
        const v508 = new Wookie();
        try { v508.d(); } catch (e) {}
    }
    function testAnonymousMethod() {
        const v514 = [1,2,3];
        function f515() {
        }
        f515.call(v514);
    }
    function CustomError(a519, a520) {
        this.message = a519;
        Error.captureStackTrace(this, a520);
    }
    function f525() {
        return "CustomError: " + this?.message;
    }
    const t455 = CustomError.prototype;
    t455.toString = f525;
    function testDefaultCustomError() {
        const v534 = new CustomError("hep-hey", undefined);
        throw v534;
    }
    function testStrippedCustomError() {
        const v537 = new CustomError("hep-hey", CustomError);
        throw v537;
    }
    function testTrace(a539, a540, a541, a542) {
        var threw = false;
        try {
            try { a540(); } catch (e) {}
        } catch(e546) {
            for (let i548 = 0; i548 < a541?.length; i548++) {
                const v554 = a541?.[a541];
                const v555 = e546?.stack;
                let v556;
                try { v556 = v555.indexOf(v554); } catch (e) {}
                const v559 = v556 != -1;
                const v566 = (((a539 + " doesn't contain expected[") + i548) + "] stack = ") + e546?.stack;
                try { assertTrue(v559, v566); } catch (e) {}
            }
            if (a542) {
                for (let i569 = 0; i569 < a542?.length; i569++) {
                    function i(a576) {
                    }
                    var message;
                    var length;
                    function stack(a582) {
                        if (a582) {
                            message = arguments;
                        } else {
                            length = arguments;
                            const v589 = arguments - 1901;
                            let v590;
                            try { v590 = v589("o"); } catch (e) {}
                            try { message.watch(0, v590); } catch (e) {}
                            let v594;
                            try { v594 = i("p"); } catch (e) {}
                            try { length.watch(0, v594); } catch (e) {}
                            try { length.unwatch(0); } catch (e) {}
                            try { message.unwatch(0); } catch (e) {}
                            length[0] = 4;
                            try { message(a582, 4); } catch (e) {}
                        }
                    }
                    try { stack(true); } catch (e) {}
                    try { stack(false); } catch (e) {}
                    try { FAIL(true, true); } catch (e) {}
                }
            }
            threw = true;
        }
        const v613 = a539 + " didn't throw";
        try { assertTrue(threw, v613); } catch (e) {}
    }
    function testCallerCensorship() {
        var threw = false;
        try {
        } catch(e619) {
            const v621 = -1;
            const v623 = e619?.stack;
            let v624;
            try { v624 = v623.indexOf("at new ReferenceError"); } catch (e) {}
            try { assertEquals(v621, v624, "CallerCensorship contained new ReferenceError"); } catch (e) {}
            threw = true;
        }
        try { assertTrue(threw, "CallerCensorship didn't throw"); } catch (e) {}
    }
    function testUnintendedCallerCensorship() {
        var threw = false;
        try {
            function f634() {
            }
            new ReferenceError({ toString: f634 });
        } catch(e638) {
            const v640 = e638?.stack;
            let v641;
            try { v641 = v640.indexOf("at new ReferenceError"); } catch (e) {}
            const v644 = v641 != -1;
            try { assertTrue(v644, "UnintendedCallerCensorship didn't contain new ReferenceError"); } catch (e) {}
            threw = true;
        }
        try { assertTrue(threw, "UnintendedCallerCensorship didn't throw"); } catch (e) {}
    }
    function testErrorsDuringFormatting() {
        function Nasty() {
        }
        function f652() {
            const v654 = new RangeError();
            throw v654;
        }
        const t549 = Nasty.prototype;
        t549.foo = f652;
        const v656 = new Nasty();
        var n = v656;
        function f659() {
        }
        n.__defineGetter__("constructor", f659);
        var threw = false;
        try {
            try { n.foo(); } catch (e) {}
        } catch(e665) {
            threw = true;
            const v668 = e665?.stack;
            let v669;
            try { v669 = v668.indexOf("<error: ReferenceError"); } catch (e) {}
            const v672 = v669 != -1;
            try { assertTrue(v672, "ErrorsDuringFormatting didn't contain error: ReferenceError"); } catch (e) {}
        }
        try { assertTrue(threw, "ErrorsDuringFormatting didn't throw"); } catch (e) {}
        threw = false;
        const t569 = ReferenceError.prototype;
        t569.toString = a$b$c$d;
        try {
            try { n.foo(); } catch (e) {}
        } catch(e682) {
            threw = true;
            const v685 = e682?.stack;
            let v686;
            try { v686 = v685.indexOf("<error>"); } catch (e) {}
            const v689 = v686 != -1;
            try { assertTrue(v689, "ErrorsDuringFormatting didn't contain <error>"); } catch (e) {}
        }
        try { assertTrue(threw, "ErrorsDuringFormatting didnt' throw (2)"); } catch (e) {}
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
    try { testErrorsDuringFormatting(); } catch (e) {}
} catch(e762) {
}
var regexp = /a(b)(c)/;
var subject = "xyzabcde";
var expected = "abc,b,c";
const v771 = String(regexp.exec(subject));
try { assertEquals(expected, v771); } catch (e) {}
function f773() {
    try { regexp(subject); } catch (e) {}
}
try { assertThrows(f773); } catch (e) {}
