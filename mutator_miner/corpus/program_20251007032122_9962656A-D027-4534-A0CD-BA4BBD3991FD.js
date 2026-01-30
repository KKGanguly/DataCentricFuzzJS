const v1 = {
    get a() {
        return this;
    },
};
v1[Symbol.toStringTag] = v1;
