const v4 = {
    [Symbol]() {
        const v3 = {
            next() {
                return this;
            },
        };
    },
};
const v8 = {
    toString() {
        style.prop = 1;
        return this;
    },
};
try {
    ({"g":Object,"prototype":Object,} = Object);
    Object.defineProperty(Object, Symbol);
} catch(e11) {
}
