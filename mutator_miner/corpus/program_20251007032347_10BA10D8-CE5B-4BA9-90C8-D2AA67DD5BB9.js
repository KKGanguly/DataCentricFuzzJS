function help_tag2id(a1, a2) {
    try {
        if (("base" == (a1 = a1.toLowerCase())) || ("select" == a1)) {
            return null;
        }
        {
            let t2 = document.querySelectorAll(a1);
            if (0 == t2.length) {
                throw `FAIL: help_tag2id -> querySelectorAll:${a1}`;
            }
            t3 = t2[a2 % t2.length];
            return t3;
        }
    } catch(e22) {
        let t1 = document.body;
        try {
            t2 = document.getElementById(`id${a2 % 512}`);
            t1 = t2 ? t2 : t1;
        } catch(e33) {
        }
        const v34 = () => {
            let t0 = document.createElement(a1);
            if (t0 instanceof HTMLUnknownElement) {
                t0 = document.createElementNS("http://www.w3.org/2000/svg", a1);
            }
            t1.appendChild(t0);
            return t0;
        };
        let r0 = v34();
        return r0;
    }
}
