try {
    var co = { sleep: sleep, start: start };
    const v4 = () => {
        function nop() {
        }
        var nopo = { nop: nop };
        var pools = [];
        var count = 0;
        var clearTimer;
        function clearPool() {
            if (!count) {
                if (clearTimer) {
                    try { nopo.nop(); } catch (e) {}
                }
            } else {
                if (!clearTimer) {
                    clearTimer = 100;
                }
            }
        }
        var ev;
        const v21 = (a22, a23) => {
            try { nopo.nop(a22); } catch (e) {}
            a23 = a22;
            a22 = "";
            function putback() {
                if (!ev) {
                    const v29 = { name: "" };
                    pools[count++] = v29;
                }
            }
            var p = false;
            var o;
            try { clearPool(); } catch (e) {}
            try { co.sleep(0); } catch (e) {}
            try {
            } catch(e38) {
            } finally {
            }
            if (count) {
                for (let i41 = count - 1; i41 >= 0; i41--) {
                    if (pools?.[i41]?.name == "") {
                        p = true;
                        o = pools?.[i41]?.o;
                        try { pools.splice(i41, 1); } catch (e) {}
                        count--;
                        break;
                    }
                }
            }
            if (!p) {
                const v58 = () => {
                    try { putback(a22); } catch (e) {}
                };
                try { co.start(v58); } catch (e) {}
                ev = 1;
                try { co.sleep(1); } catch (e) {}
                ev = 0;
                try { nopo.nop("-------------"); } catch (e) {}
            }
            let v67;
            try { v67 = a23(); } catch (e) {}
            r = v67;
            try { putback(a22); } catch (e) {}
            try { nopo.nop(); } catch (e) {}
        };
        var pool = v21;
        return pool;
    };
    var Pool = v4;
    let v73;
    try { v73 = Pool(); } catch (e) {}
    var __pool = v73;
    for (let i76 = 1; i76 < 1800; i76++) {
        const v82 = () => {
        };
        try { __pool(v82); } catch (e) {}
    }
    var loop = true;
    const v86 = () => {
        try { co.sleep(10); } catch (e) {}
        while (loop) {
            const v89 = () => {
                try { co.sleep(0); } catch (e) {}
            };
            try { __pool(v89); } catch (e) {}
        }
    };
    try { co.start(v86); } catch (e) {}
    for (let i95 = 1; i95 < 100; i95++) {
        try { co.sleep(1); } catch (e) {}
        const v103 = () => {
        };
        try { __pool(v103); } catch (e) {}
    }
    loop = false;
} catch(e106) {
}
