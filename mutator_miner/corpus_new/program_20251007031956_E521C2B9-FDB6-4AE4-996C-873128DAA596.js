function f0() {
}
f0("async() => { for await (var a ;;) {} }", SyntaxError);
