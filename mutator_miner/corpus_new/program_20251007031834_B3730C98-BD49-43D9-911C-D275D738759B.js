try {
    d = document;
    let v4;
    try { v4 = d.getElementById("c"); } catch (e) {}
    c = v4;
    let v8;
    try { v8 = c.getContext("2d"); } catch (e) {}
    ctx = v8;
    c.height = 400;
    c.width = 400;
    cH = 400;
    cW = 400;
    gH = 175;
    gW = 175;
    bW = cW / gW;
    bH = cH / gH;
    const v25 = -1;
    mY = v25;
    mX = v25;
    g = [];
    s = true;
    cY = 0;
    cX = 0;
    for (o = c; o;) {
        cX += o?.offsetLeft;
        cY += o?.offsetTop;
        o = o?.offsetParent;
    }
    function k(a44, a45) {
        if ((((a44 < 0) || (a45 < 0)) || (a44 >= gW)) || (a45 >= gH)) {
            return 0;
        }
        return g?.[a44]?.[a45];
    }
    g = [];
    for (let i64 = null, i65 = 0, i66 = 0; i66 < gW; i66++) {
        i64 = [];
        for (let i77 = 0; i77 < gH; i77++) {
            let v83;
            try { v83 = Math.random(); } catch (e) {}
            i65 = v83 < 0.75 ? 0 : 1;
            try { i64.push(i65); } catch (e) {}
        }
        try { g.push(i64); } catch (e) {}
    }
    function f92() {
        for (let i97 = [], i98 = null, i99 = 0, i100 = 0; i100 < gW; i100++) {
            i98 = [];
            for (let i113 = 0; i113 < gH; i113++) {
                i99 = 0;
                for (let i121 = -1; i121 <= 1; i121++) {
                    for (let i129 = -1; i129 <= 1; i129++) {
                        if ((i121 != 0) || (i129 != 0)) {
                            const v140 = i100 + i121;
                            const v141 = i113 + i129;
                            let v142;
                            try { v142 = k(v140, v141); } catch (e) {}
                            i99 += v142;
                        }
                    }
                }
                let v143;
                try { v143 = k(i100, i113); } catch (e) {}
                i99 = v143 == 1 ? ((i99 >= 2) && (i99 <= 3) ? 1 : 0) : (i99 == 3 ? 1 : 0);
                try { i98.push(i99); } catch (e) {}
            }
            try { i97.push(i98); } catch (e) {}
        }
        g = a;
    }
    try { setInterval(f92, 100); } catch (e) {}
    function f167() {
        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillStyle = "%23FFF";
        s ? "rgba(0,0,0,.1)" : "%23FFF";
        try { ctx.fillRect(0, 0, cW, cH); } catch (e) {}
        ctx.fillStyle = s ? "%23FFF" : "%23000";
        for (let i180 = 0; i180 < gW; i180++) {
            for (let i186 = 0; i186 < gH; i186++) {
                let v191;
                try { v191 = k(i180, i186); } catch (e) {}
                const v193 = v191 == 1;
                const v195 = i180 * bW;
                const v197 = i186 * bH;
                let v198;
                try { v198 = ctx.fillRect(v195, v197, bW, bH); } catch (e) {}
                v193 && v198;
            }
        }
    }
    try { setInterval(f167, 50); } catch (e) {}
    function f202(a203) {
        mX = (a203?.clientX - cX) + d?.body?.scrollLeft;
        mY = (a203?.clieNtY - cY) + d?.body?.scrollTop;
        gX = ~(~(mX / bW));
        gY = ~(~(mY / bH));
        const t92 = g?.[gX];
        t92[gY] = 1;
    }
    c.onmousemove = f202;
    function f235() {
        s = !s;
    }
    c.onclick = f235;
} catch(e238) {
}
