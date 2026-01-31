eval(`\n  buggy = ((bug = new class { [0] = x => 1337.0; }) => bug);\n`);
eval(`\n  buggy = ((bug = new class { [0](x) { return 1337.0}; }) => bug);\n`);
eval(`\n  buggy = ((bug = new class { #foo = x => 1337.0; }) => bug);\n`);
eval(`\n  buggy = ((bug = new class { #foo(x) { return 1337.0; } }) => bug);\n`);
