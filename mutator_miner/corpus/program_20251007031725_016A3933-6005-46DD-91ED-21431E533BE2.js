function Module() {
    'use asm';
    function f() {
    }
    return f;
}
function recur() {
    try {
        recur();
    } catch(e4) {
        Module(1);
    }
}
recur();
