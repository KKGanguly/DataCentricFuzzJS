function f0() {
}
function assertTrue() {
}
assertTrue = assertTrue;
function assertFalse() {
}
assertFalse = assertFalse;
__v_3 = [];
__v_2 = [];
__v_0 = 0;
function f11() {
    if (__v_0++ > 2) {
        return;
    }
    gc();
    __v_3.concat(__v_2);
}
__v_2.__defineGetter__(0, f11);
__v_2[0];
function __f_2() {
}
function __f_1() {
    f0("1...");
    function __f_5(a28, a29) {
        'use asm';
        var __f_2 = a29.__f_2;
        function __f_3(a33) {
            a33 = a33 | 0;
        }
        return { __f_3: __f_3 };
    }
    var __v_2 = __f_5(this, { __f_2: __f_2 });
}
__f_1();
function __f_10() {
    f0("2...");
    function __f_5() {
        'use asm';
        function __f_3(a47) {
        }
    }
    var __v_2 = __f_5();
    assertFalse();
}
__f_10();
function __f_11() {
    f0("3...");
    function __f_6() {
        function __f_5() {
            'use asm';
            function __f_3() {
            }
            return { __f_3: __f_3 };
        }
        var __v_2 = __f_5({ __f_2: __f_2 });
    }
    let m = __f_6;
    for (let i64 = 0; i64 < 30; i64++) {
        f0("  i = " + i64);
        var x = m();
        for (let i76 = 0; i76 < 200; i76++) {
            try {
            } catch(e82) {
            }
        }
    }
}
__f_11();
