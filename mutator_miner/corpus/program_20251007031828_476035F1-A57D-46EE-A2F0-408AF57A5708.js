var protoOfError = Reflect.getPrototypeOf(TypeError);
if (!(protoOfError === Error)) {
    const v9 = new Error("expected: function Error() {[native code]}, got: " + protoOfError);
    throw v9;
}
