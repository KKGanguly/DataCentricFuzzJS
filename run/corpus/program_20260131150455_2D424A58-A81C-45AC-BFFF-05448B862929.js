function f() {
    print(arguments);
}
const v7 = Function.prototype.call;
const v10 = new Proxy(v7, {});
const v9 = v10;
let call = v9;
call.call(f);
