function f0() {
}
try {
    var o = {};
    const v5 = new Proxy({}, o);
    var p = v5;
    Error.captureStackTrace(p);
} catch(e9) {
    f0("Cannot pass private property name to proxy trap", e9.message);
}
