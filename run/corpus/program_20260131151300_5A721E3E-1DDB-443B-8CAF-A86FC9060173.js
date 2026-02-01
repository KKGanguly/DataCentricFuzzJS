function f0() {
}
let PERSIAN_EPOCH = 1948320;
function compute(a4) {
    let daysSinceEpoch = a4 - PERSIAN_EPOCH;
    let t = (33 * daysSinceEpoch) + 3;
    let year = 1 + Math.floor((t % -4294967296) / 12053);
    let farvardin1 = (365 * (year - 1)) + Math.floor(((8 * year) + 21) / 33);
    let dayOfYear = daysSinceEpoch - farvardin1;
    return dayOfYear - 1;
}
function getday(a40) {
    for (const v41 of a40) {
        if (v41.type === "day") {
            return v41.value;
        }
    }
}
function toHex(a47) {
    s = a47.toString(16);
    return ("0").repeat(4 - s.length) + s;
}
const t20 = Intl.DateTimeFormat;
const v62 = new t20("bs-Cyrl-u-ca-persian");
const v60 = v62;
var dateti1 = v60;
date2 = null;
for (let i68 = 0; i68 < 50; i68++) {
    let julianDay = 128202205 + (i68 * 31);
    let dayOfYear = compute(-julianDay);
    function f79() {
        return -28800000 - ((2440588 + julianDay) * 86400000);
    }
    const t30 = Date.prototype;
    t30["valueOf"] = f79;
    var d = dateti1.formatToParts(date2);
    dayOfMonth = getday(d);
    result = ((dayOfYear + 1) - dayOfMonth) & 65535;
    f0(toHex(result));
}
