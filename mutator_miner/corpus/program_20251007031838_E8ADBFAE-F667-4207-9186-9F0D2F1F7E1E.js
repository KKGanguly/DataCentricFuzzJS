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
    print("1...");
    function __f_5(a30, a31) {
        'use asm';
        var __f_2 = a31.__f_2;
        function __f_3(a35) {
            a35 = a35 | 0;
        }
        return { __f_3: __f_3 };
    }
    var __v_2 = __f_5(this, { __f_2: __f_2 });
}
__f_1();
function __f_10() {
    print("2...");
    function __f_5() {
        'use asm';
        function __f_3(a50) {
        }
    }
    var __v_2 = __f_5();
    assertFalse();
}
__f_10();
function __f_11() {
    print("3...");
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
    for (let i69 = 0; i69 < 30; i69++) {
        print("  i = " + i69);
        var x = m();
        for (let i81 = 0; i81 < 200; i81++) {
            try {
            } catch(e88) {
            }
        }
    }
}
__f_11();
