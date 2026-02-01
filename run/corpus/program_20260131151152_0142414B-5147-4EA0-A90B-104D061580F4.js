const v3 = new Uint8Array(643);
v3[467];
let v5 = 0.0;
v5--;
const v8 = Symbol.iterator;
const v17 = {
    [v8]() {
        let v10 = 10;
        const v16 = {
            next() {
                v10--;
                const v14 = v10 == 0;
                return { done: v14, value: v10 };
            },
        };
        return v16;
    },
};
function f18() {
    return v3;
}
function f20() {
    return 643;
}
new BigInt64Array(127);
gc({ execution: "sync", type: "major" });
