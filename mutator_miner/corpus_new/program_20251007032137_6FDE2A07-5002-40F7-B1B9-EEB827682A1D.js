try {
    function f(a3, a4) {
        const v6 = f?.caller;
        let v7;
        try { v7 = v6.toString(); } catch (e) {}
        var str = v7;
        try { alert(str); } catch (e) {}
    }
    const v11 = { has: f };
    let v12;
    try { v12 = new Proxy(__proto__, v11); } catch (e) {}
    const t11 = __proto__?.__proto__?.__proto__?.__proto__;
    t11.__proto__ = v12;
} catch(e16) {
}
