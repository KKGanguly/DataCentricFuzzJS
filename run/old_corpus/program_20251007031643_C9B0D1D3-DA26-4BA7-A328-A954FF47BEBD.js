try {
    propName = "WebCore::HiddenProperty::listener";
    obj = {};
    function f5() {
        const t4 = Object?.prototype;
        delete t4?.[propName];
        hiddenObj = this;
    }
    const v12 = Object?.prototype;
    try { v12.__defineSetter__(propName, f5); } catch (e) {}
    try { addEventListener("message", obj); } catch (e) {}
    hiddenObj[propName] = 256;
    try { removeEventListener("message", obj); } catch (e) {}
} catch(e23) {
}
