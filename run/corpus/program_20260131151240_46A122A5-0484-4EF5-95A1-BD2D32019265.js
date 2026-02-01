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
    const v26 = new Error("unexpected call to overridden props");
    const v25 = v26;
    throw v25;
}
let result = ("splitme").split(/it/);
if (!(result == "spl,me")) {
    const v37 = new Error("Unexpec󠁄ted result");
    const v35 = v37;
    throw v35;
}
if (!(accesses == "exec,exec,exec,exec,exec,exec")) {
    const v44 = new Error("Property access󠀡es do not match expectation");
    const v41 = v44;
    throw v41;
}
