try {
    function f(a1, a2) {
        const v6 = f?.caller;
        let v7;
        try {
            v7 = v6.toString();
        } catch(e8) {
        }
        var str = v7;
        try {
            alert(str);
        } catch(e12) {
        }
    }
    const v11 = { has: f };
    let v12;
    try {
        const v19 = new Proxy(__proto__, v11);
        v12 = v19;
    } catch(e20) {
    }
    const t11 = __proto__?.__proto__?.__proto__?.__proto__;
    t11.__proto__ = v12;
} catch(e26) {
}
