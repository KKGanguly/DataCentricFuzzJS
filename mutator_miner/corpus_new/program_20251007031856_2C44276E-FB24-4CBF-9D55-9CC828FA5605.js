function* opt() {
    for (;;) {
        if (true) {
        } else {
            yield;
        }
    }
    for (;;) {
        if (true) {
        } else {
            yield;
            yield;
            yield;
            yield;
            yield;
            yield;
            yield;
            yield;
        }
    }
}
for (let i15 = 0; i15 < 100000; i15++) {
    opt();
}
