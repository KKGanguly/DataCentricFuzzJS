function f0() {
}
function testAdvanceLastIndex(a2, a3) {
    let exec_call_count = 0;
    let last_index_setter_call_count = 0;
    let final_last_index_value;
    const v26 = {
        get global() {
            return true;
        },
        get unicode() {
            return true;
        },
        get lastIndex() {
            return a2;
        },
        set lastIndex(a16) {
            last_index_setter_call_count++;
            final_last_index_value = a16;
        },
        exec() {
            return exec_call_count++ == 0 ? [""] : null;
        },
    };
    var customRegexp = v26;
    RegExp.prototype[Symbol.replace].call(customRegexp);
    f0(2, exec_call_count);
    f0(2, last_index_setter_call_count);
    f0(a3, final_last_index_value);
}
testAdvanceLastIndex(-1, 1);
testAdvanceLastIndex(0, 1);
testAdvanceLastIndex((2 ** 31) - 2, (2 ** 31) - 1);
testAdvanceLastIndex((2 ** 31) - 1, (2 ** 31) - 0);
testAdvanceLastIndex((2 ** 32) - 3, (2 ** 32) - 2);
testAdvanceLastIndex((2 ** 32) - 2, (2 ** 32) - 1);
testAdvanceLastIndex((2 ** 32) - 1, (2 ** 32) - 0);
testAdvanceLastIndex((2 ** 53) - 2, (2 ** 53) - 1);
testAdvanceLastIndex((2 ** 53) - 1, (2 ** 53) - 0);
testAdvanceLastIndex((2 ** 53) - 0, (2 ** 53) - 0);
