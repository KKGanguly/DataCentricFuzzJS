const v1 = class {
    static [536870912](a3) {
    }
    static get g() {
    }
}
new Uint16Array();
`\n  buggy = ((bug = new class { [0](x) { return 1337.0}; }) => bug);\n`;
eval(`\n  buggy = ((bug = new class { #foo(x) { return 1337.0; } }) => bug);\n`);
