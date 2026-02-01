let v2;
try {
    v2 = document.createElement("p");
} catch(e5) {
}
style = v2?.style;
const v11 = {
    toString() {
        style.prop = 1;
    },
};
const v9 = v11;
const v10 = { value: v9 };
try {
    Object.defineProperty(style, "prop", v10);
} catch(e19) {
}
