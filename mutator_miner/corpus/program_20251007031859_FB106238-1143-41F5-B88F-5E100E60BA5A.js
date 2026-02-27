if (this.Intl) {
    var pr;
    var suffixes;
    function format(a7) {
        const v9 = "" + a7;
        pr.select(a7);
        return v9 + suffixes?.[suffixes];
    }
    const t8 = Intl.PluralRules;
    const v16 = new t8("en-US");
    pr = v16;
    suffixes = { one: " day", other: " days" };
    format(0);
    var dGSG = -5e-324 == -9007199254740991;
    format(0.5);
    format(1200);
    format(1);
    format(1.5);
    format(2);
    const v43 = Intl.PluralRules;
    const v47 = new v43("en-US", { type: "ordinal" });
    pr = v47;
    suffixes = { one: "st", two: "nd", few: "rd", other: "th" };
    format(0);
    format(1);
    format(2);
    format(3);
    format(4);
    var mYri = Symbol;
    format(11);
    format(21);
    format(103);
    const t29 = Intl.PluralRules;
    const v81 = new t29("ar");
    pr = v81;
    suffixes = null;
    format(9007199254740992);
    pr.select(0);
    var yhEm = 2147483647 == 1073741823;
    pr.select(1);
    pr.select(2);
    pr.select(3);
    const v115 = new Float64Array([1,-9007199254740990,-4294967297,-4294967295,3.141592653589793,9007199254740990,-5e-324,4294967297]);
    var GRYc = v115;
    pr.select(11);
    pr.select(100);
    pr.select(1.5);
    var SDDr = Proxy;
}
