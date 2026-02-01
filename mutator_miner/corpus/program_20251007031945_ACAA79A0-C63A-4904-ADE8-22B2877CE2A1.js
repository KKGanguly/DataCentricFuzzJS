function f0() {
}
const v1 = () => {
    const t3 = Intl.ListFormat;
    const v4 = new t3();
    return v4.format();
};
f0(v1);
const v7 = () => {
    const v9 = Intl.getCanonicalLocales();
    const t9 = Intl.ListFormat;
    const v11 = new t9();
    return v11.format(v9);
};
f0(v7);
const v14 = () => {
    const v19 = Intl.getCanonicalLocales(["en","fr"]);
    const t16 = Intl.ListFormat;
    const v21 = new t16();
    return v21.format(v19);
};
f0(v14);
let arr = ["a","b","c"];
const v29 = %HasHoleyElements(arr);
f0(v29);
const v31 = () => {
    const t26 = Intl.ListFormat;
    const v34 = new t26();
    return v34.format(arr);
};
f0(v31);
for (let i38 = 0; i38 < 10000; i38++) {
    arr.push("xx");
}
const v46 = %HasHoleyElements(arr);
f0(v46);
const v48 = () => {
    const t37 = Intl.ListFormat;
    const v51 = new t37();
    return v51.format(arr);
};
f0(v48);
arr[arr.length + 10] = "x";
const v58 = %HasHoleyElements(arr);
f0(v58);
const v60 = %HasDictionaryElements(arr);
f0(v60);
const v62 = () => {
    const t48 = Intl.ListFormat;
    const v65 = new t48();
    return v65.format(arr);
};
f0(v62, TypeError);
arr[(arr = ["a","b","c"]).length + 100000] = "x";
const v77 = %HasDictionaryElements(arr);
f0(v77);
const v79 = () => {
    const t57 = Intl.ListFormat;
    const v82 = new t57();
    return v82.format(arr);
};
f0(v79, TypeError);
