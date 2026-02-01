function f0() {
}
function TestNewlineInCPPComment() {
    function Module() {
        'use asm';
        function f() {
        }
        return f;
    }
    Module();
    const v5 = %IsAsmWasmCode(Module);
    f0(v5);
}
TestNewlineInCPPComment();
function TestNewlineInCComment() {
    function Module() {
        'use asm';
        function f() {
        }
        return f;
    }
    Module();
    const v12 = %IsAsmWasmCode(Module);
    f0(v12);
}
TestNewlineInCComment();
