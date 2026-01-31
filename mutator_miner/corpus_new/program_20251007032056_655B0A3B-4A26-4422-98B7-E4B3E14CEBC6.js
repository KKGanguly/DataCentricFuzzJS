for (let i1 = 0; i1 < 10; i1++) {
    const v8 = {};
    const v10 = {
        getPrototypeOf() {
        },
    };
    const v11 = new Proxy(v8, v10);
    __proto__ = v11;
}
