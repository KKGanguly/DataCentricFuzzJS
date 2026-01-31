function f0() {
}
if (this?.Intl) {
    const v4 = Intl?.NumberFormat;
    let v5;
    try { v5 = new v4(); } catch (e) {}
    v5 = v5;
    const v7 = Intl?.DateTimeFormat;
    let v8;
    try { v8 = new v7(); } catch (e) {}
    v9 = v8;
    v52 = v9?.["formatToParts"];
    var v55 = {};
    const v16 = () => {
        let v20;
        try { v20 = Reflect.apply(v52, v5, v55); } catch (e) {}
        return v20;
    };
    try { f0(v16, TypeError); } catch (e) {}
}
