let accesses = [];
let origDescriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, "exec");
let origExec = origDescriptor.value;
const v10 = RegExp.prototype;
function f12(a13) {
    accesses.push("exec");
    return origExec.call(this, a13);
}
Object.defineProperty(v10, "exec", { value: f12 });
if (!(accesses == "")) {
    const v25 = new Error("unexpected call to overridden props");
    throw v25;
}
let result = ("splitme").split(/it/);
if (!(result == "spl,me")) {
    const v35 = new Error("Unexpec󠁄ted result");
    throw v35;
}
if (!(accesses == "exec,exec,exec,exec,exec,exec")) {
    const v41 = new Error("Property access󠀡es do not match expectation");
    throw v41;
}
