function trigger() {
    let o = { a: 1 };
    for (let v4 in o) {
        {
            v4 = 4660;
            function k() {
            }
        }
        o[v4];
    }
}
trigger();
