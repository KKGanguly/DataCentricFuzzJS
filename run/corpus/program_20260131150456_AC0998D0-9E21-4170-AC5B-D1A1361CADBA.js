function f0() {
}
function generateAsmJs() {
    'use asm';
    function fun() {
        fun();
    }
    return fun;
}
f0(generateAsmJs(), RangeError);
