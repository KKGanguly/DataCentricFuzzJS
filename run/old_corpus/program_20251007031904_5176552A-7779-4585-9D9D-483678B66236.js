let v2;
try { v2 = document.getElementById("frame"); } catch (e) {}
const otherWindow = v2?.contentWindow;
try {
    const v6 = bodyy?.parentNode;
    try { v6.removeChild(bodyy); } catch (e) {}
    const v8 = `import('foobar');`;
    try { otherWindow.eval(v8); } catch (e) {}
} catch(e10) {
    e10?.stack;
}
