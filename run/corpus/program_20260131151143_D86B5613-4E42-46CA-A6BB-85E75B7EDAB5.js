try {
    function opt() {
        function aux(a2, a3) {
            if (a3) {
                a3 >> a2;
            } else {
                let c = 0;
                while (c < 7) {
                    c++;
                }
            }
        }
        let p = Promise;
        ++p;
        try { aux(1n, 1n); } catch (e) {}
        try { aux(1n, p); } catch (e) {}
        let v19;
        try { v19 = aux("number", p); } catch (e) {}
        return v19;
    }
    for (let i21 = 0; i21 < 10000; i21++) {
        try { opt(); } catch (e) {}
    }
    try { opt(); } catch (e) {}
} catch(e29) {
}
