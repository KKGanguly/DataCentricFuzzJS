const v0 = (a1, a2) => {
    return a2;
};
Error.prepareStackTrace = v0;
var CallSiteConstructor = Error().stack[0].constructor;
try {
    const v11 = new CallSiteConstructor(3, 6);
    v11.toString();
} catch(e13) {
}
