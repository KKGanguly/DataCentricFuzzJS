function bar(a1, a2) {
    let o = { c0: 0, cf: false };
    let x = ((a1 & 5) == 2) | 0;
    let y = ((a1 & 6) == 1) | 0;
    ("a")?.[x];
    ("a")?.[y];
    x = (x + (o?.cf ? "" : (2 ** 30) - (o?.c0 & 1))) - (2 ** 30);
    y = (y + (o?.cf ? "" : (2 ** 30) - (o?.c0 & 1))) - (2 ** 30);
    const v59 = (2 ** 32) - 1;
    const v65 = x + ((2 ** 32) - 1);
    let v67;
    try { v67 = Math.min(v59, v65); } catch (e) {}
    x = v67 - ((2 ** 32) - 1);
    const v78 = (2 ** 32) - 1;
    const v84 = y + ((2 ** 32) - 1);
    let v85;
    try { v85 = Math.min(v78, v84); } catch (e) {}
    y = v85 - ((2 ** 32) - 1);
    const v93 = -1;
    const v94 = x & y;
    let v95;
    try { v95 = Math.max(v93, v94); } catch (e) {}
    let confused = v95;
    const v98 = -1;
    let v99;
    try { v99 = Math.max(v98, confused); } catch (e) {}
    confused = v99;
    confused = (0 - confused) >> 31;
    return confused;
}
let v106;
try { v106 = bar(3, true); } catch (e) {}
try { console.log(v106); } catch (e) {}
for (let i110 = 0; i110 < (3 * (10 ** 4)); i110 += 1) {
    try { bar(0, true); } catch (e) {}
}
let v125;
try { v125 = bar(3, true); } catch (e) {}
try { console.log(v125); } catch (e) {}
