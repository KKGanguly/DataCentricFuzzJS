Symbol.for(Symbol.description);
new Uint16Array(1740);
const v6 = [];
function f7() {
    v6.length = 1;
    return "funky";
}
f7();
const v11 = { toJSON: f7 };
for (let v12 = 0; v12 < 5; v12++) {
    v6[v12] = v12;
}
v6[0] = v11;
JSON.stringify(v6).localeCompare();
