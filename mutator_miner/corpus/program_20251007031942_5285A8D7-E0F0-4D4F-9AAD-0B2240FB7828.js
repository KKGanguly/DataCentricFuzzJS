function opt(a1, a2) {
    try { a1.push(a2); } catch (e) {}
    a1[0] = 2.3023e-320;
}
function main() {
    for (let i7 = 0; i7 < 65536; i7++) {
        let tmp = [1.1,2.2,3.3];
        delete tmp?.[1];
        try { opt(tmp, 2.2); } catch (e) {}
    }
    let arr = [1.1];
    const v26 = -5.3049894784e-314;
    try { opt(arr, v26); } catch (e) {}
    try { alert(arr); } catch (e) {}
}
try { main(); } catch (e) {}
