var x = {};
function f3() {
    return 42;
}
x.__defineGetter__("0", f3);
print(Object.getOwnPropertyDescriptor(x, "0").value);
