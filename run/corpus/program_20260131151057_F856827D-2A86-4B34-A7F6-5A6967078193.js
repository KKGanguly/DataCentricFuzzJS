function f0() {
}
function regressionCaseOne() {
    var c;
    for (const v7 of [[0]]) {
        function f() {
            return a;
        }
    }
    try {
        c();
    } catch(e11) {
    }
}
regressionCaseOne();
function testForInFunction() {
    for (const v16 in { foo: 42 }) {
        function f17() {
            let v18;
            try {
                v18 = b();
            } catch(e22) {
            }
            return v18;
        }
        let v19;
        try {
            v19 = f17();
        } catch(e26) {
        }
        try {
            f0(b, v19);
        } catch(e29) {
        }
    }
}
try {
    testForInFunction();
} catch(e31) {
}
function testForOfFunction() {
    for (const v36 of [[42]]) {
        function f28() {
            let v29;
            try {
                v29 = b();
            } catch(e42) {
            }
            return v29;
        }
        let v30;
        try {
            v30 = f28();
        } catch(e46) {
        }
        try {
            f0(b, v30);
        } catch(e49) {
        }
    }
}
try {
    testForOfFunction();
} catch(e51) {
}
function testForInVariableProxy() {
    for (const v55 in { foo: 42 }) {
        try {
            f0(3, a);
        } catch(e59) {
        }
        try {
            f0(a, b);
        } catch(e63) {
        }
    }
}
try {
    testForInVariableProxy();
} catch(e65) {
}
function testForOfVariableProxy() {
    for (const v70 of [[42]]) {
        try {
            f0(42, a);
        } catch(e74) {
        }
        try {
            f0(a, b);
        } catch(e78) {
        }
    }
}
try {
    testForOfVariableProxy();
} catch(e80) {
}
