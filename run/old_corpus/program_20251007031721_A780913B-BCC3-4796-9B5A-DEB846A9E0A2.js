function trigger() {
    let a;
    let b;
    let c;
    function g() {
        try { trigger(); } catch (e) {}
    }
    try { g(); } catch (e) {}
}
try { trigger(); } catch (e) {}
