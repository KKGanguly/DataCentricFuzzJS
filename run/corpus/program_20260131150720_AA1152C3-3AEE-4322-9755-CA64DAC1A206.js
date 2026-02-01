function opt(a1, a2) {
    try {
        a1.push(a2);
    } catch(e4) {
    }
    a1[0] = 2.3023e-320;
}
function main() {
    for (let i8 = 0; i8 < 65536; i8++) {
        let tmp = [1.1,2.2,3.3];
        delete tmp?.[1];
        try {
            opt(tmp, 2.2);
        } catch(e23) {
        }
    }
    let arr = [1.1];
    const v26 = -5.3049894784e-314;
    try {
        opt(arr, v26);
    } catch(e31) {
    }
    try {
        alert(arr);
    } catch(e34) {
    }
}
try {
    main();
} catch(e36) {
}
