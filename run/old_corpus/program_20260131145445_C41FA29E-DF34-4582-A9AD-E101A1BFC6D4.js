function f0() {
}
if (this?.Intl) {
    const v4 = Intl?.NumberFormat;
    let v5;
    try {
        const v8 = new v4();
        v5 = v8;
    } catch(e9) {
    }
    v5 = v5;
    const v7 = Intl?.DateTimeFormat;
    let v8;
    try {
        const v14 = new v7();
        v8 = v14;
    } catch(e15) {
    }
    v9 = v8;
    v52 = v9?.["formatToParts"];
    var v55 = {};
    const v23 = () => {
        let v20;
        try {
            v20 = Reflect.apply(v52, v5, v55);
        } catch(e29) {
        }
        return v20;
    };
    const v16 = v23;
    try {
        f0(v16, TypeError);
    } catch(e33) {
    }
}
