for (let i1 = 0; i1 < 25; i1++) {
    const b = i1 & i1;
    try {
        b(b, b, b);
    } catch(e10) {
    }
}
