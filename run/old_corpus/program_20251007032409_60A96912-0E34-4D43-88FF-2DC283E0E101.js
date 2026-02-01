let v0 = [];
let v1 = 1;
const v4 = () => {
    try { async_hooks.createHook(v1); } catch (e) {}
    try { gc(); } catch (e) {}
};
const v9 = { after: v4 };
let v11;
try { v11 = async_hooks.createHook(v9); } catch (e) {}
let v2 = v11;
try { v2.enable(); } catch (e) {}
const v14 = () => {
};
const v15 = () => {
};
const v17 = (a18) => {
    let v20;
    try { v20 = a18(42); } catch (e) {}
    return v20;
};
let v21;
try { v21 = new Promise(v17); } catch (e) {}
let v22;
try { v22 = v21.then(v15); } catch (e) {}
try { v22.catch(v14); } catch (e) {}
v1 = v0;
