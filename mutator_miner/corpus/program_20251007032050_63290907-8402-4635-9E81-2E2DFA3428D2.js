function f0() {
}
function regressionCaseOne() {
    var c;
    for (const v7 of [[0]]) {
        function f() {
            return a;
        }
    }
    try { c(); } catch (e) {}
}
regressionCaseOne();
function testForInFunction() {
    for (const v15 in { foo: 42 }) {
        function f17() {
            let v18;
            try { v18 = b(); } catch (e) {}
            return v18;
        }
        let v19;
        try { v19 = f17(); } catch (e) {}
        try { f0(b, v19); } catch (e) {}
    }
}
try { testForInFunction(); } catch (e) {}
function testForOfFunction() {
    for (const v26 of [[42]]) {
        function f28() {
            let v29;
            try { v29 = b(); } catch (e) {}
            return v29;
        }
        let v30;
        try { v30 = f28(); } catch (e) {}
        try { f0(b, v30); } catch (e) {}
    }
}
try { testForOfFunction(); } catch (e) {}
function testForInVariableProxy() {
    for (const v36 in { foo: 42 }) {
        try { f0(3, a); } catch (e) {}
        try { f0(a, b); } catch (e) {}
    }
}
try { testForInVariableProxy(); } catch (e) {}
function testForOfVariableProxy() {
    for (const v47 of [[42]]) {
        try { f0(42, a); } catch (e) {}
        try { f0(a, b); } catch (e) {}
    }
}
try { testForOfVariableProxy(); } catch (e) {}
