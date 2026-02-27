function f() {
    print(arguments);
}
const v7 = Function.prototype.call;
const v9 = new Proxy(v7, {});
let call = v9;
call.call(f);
