function trigger() {
    let a;
    let b;
    let c;
    function g() {
        try {
            trigger();
        } catch(e9) {
        }
    }
    try {
        g();
    } catch(e11) {
    }
}
try {
    trigger();
} catch(e13) {
}
