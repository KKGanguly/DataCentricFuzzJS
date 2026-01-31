function main() {
    const v2 = { foo: 1.1 };
    Object.seal(v2);
    Object.preventExtensions(v2);
    Object.freeze(v2);
    const v12 = { foo: 2.2 };
    Object.preventExtensions(v12);
    Object.freeze(v12);
    const v18 = { foo: Object };
    v12.__proto__ = 0;
    v2[5] = 1;
}
main();
