let v2;
try { v2 = document.createElement("p"); } catch (e) {}
style = v2?.style;
const v9 = {
    toString() {
        style.prop = 1;
    },
};
const v10 = { value: v9 };
try { Object.defineProperty(style, "prop", v10); } catch (e) {}
