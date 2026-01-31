function main() {
    var v1 = [13.37,13.37,13.37,13.37];
    var v4 = { isExtensible: Infinity };
    const v12 = new Proxy(WeakMap, v4);
    var v6 = v12;
    v6.__proto__ = v1;
    v1.__proto__ = v6;
    with (v1) {
        valueOf = 0;
    }
}
try { main(); } catch (e) {}
