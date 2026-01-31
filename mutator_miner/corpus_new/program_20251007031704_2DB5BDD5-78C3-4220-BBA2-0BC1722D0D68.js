function f0() {
}
f0(["o"], /.(?<!^.)/m.exec("foobar"));
f0(["o"], /.(?<!\b.)/m.exec("foobar"));
f0(["f"], /.(?<!\B.)/m.exec("foobar"));
