try {
    var o = {};
    let v4;
    try { v4 = document.createElement("A1"); } catch (e) {}
    o[1482] = v4;
    const v5 = o?.[1482];
    try { Object.preventExtensions(v5); } catch (e) {}
    const v9 = self?.document;
    try { Object.freeze(v9); } catch (e) {}
    let v13;
    try { v13 = document.createElementNS("http://www.w3.org/1999/xhtml", "form"); } catch (e) {}
    o[5034] = v13;
    const t12 = o?.[5034];
    t12["name"] = 1;
    const v17 = o?.[5034];
    const v18 = document?.documentElement;
    try { v18.appendChild(v17); } catch (e) {}
    const v22 = o?.[1482]?.["1"];
    try { console.log(v22); } catch (e) {}
} catch(e25) {
}
