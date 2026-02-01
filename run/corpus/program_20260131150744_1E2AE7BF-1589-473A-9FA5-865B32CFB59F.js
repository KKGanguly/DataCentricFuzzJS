let v2;
try {
    v2 = document.getElementById("frame");
} catch(e5) {
}
const otherWindow = v2?.contentWindow;
try {
    const v6 = bodyy?.parentNode;
    try {
        v6.removeChild(bodyy);
    } catch(e12) {
    }
    const v8 = `import('foobar');`;
    try {
        otherWindow.eval(v8);
    } catch(e16) {
    }
} catch(e17) {
    e17?.stack;
}
