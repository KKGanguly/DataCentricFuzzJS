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
    aux(1n, 1n);
    aux(1n, p);
    return aux("number", p);
}
for (let i21 = 0; i21 < 10000; i21++) {
    opt();
}
opt();
