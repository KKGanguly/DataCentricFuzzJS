try {
    propName = "WebCore::HiddenProperty::listener";
    obj = {};
    function f5() {
        const t4 = Object?.prototype;
        delete t4?.[propName];
        hiddenObj = this;
    }
    const v12 = Object?.prototype;
    try {
        v12.__defineSetter__(propName, f5);
    } catch(e17) {
    }
    try {
        addEventListener("message", obj);
    } catch(e22) {
    }
    hiddenObj[propName] = 256;
    try {
        removeEventListener("message", obj);
    } catch(e30) {
    }
} catch(e31) {
}
