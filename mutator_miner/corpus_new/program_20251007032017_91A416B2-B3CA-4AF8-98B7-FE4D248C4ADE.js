const v1 = new Object();
const t1 = SyntaxError.prototype;
t1.constructor = v1;
const t3 = SyntaxError.prototype.constructor;
t3.name = 1;
function f7() {
    var _caller = this.toString.caller;
    while (_caller.name !== "FormatMessage") {
        _caller = _caller.caller;
    }
    alert(_caller.arguments[0].script.source);
}
const t12 = Number.prototype;
t12.toString = f7;
const v25 = Object.prototype.toString;
const t15 = SyntaxError.prototype;
t15.toString = v25;
