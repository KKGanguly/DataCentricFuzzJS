let PERSIAN_EPOCH = 1948320;
function compute(a3) {
    let daysSinceEpoch = a3 - PERSIAN_EPOCH;
    let t = (33 * daysSinceEpoch) + 3;
    let year = 1 + Math.floor((t % -4294967296) / 12053);
    let farvardin1 = (365 * (year - 1)) + Math.floor(((8 * year) + 21) / 33);
    let dayOfYear = daysSinceEpoch - farvardin1;
    return dayOfYear - 1;
}
function getday(a39) {
    for (const v40 of a39) {
        if (v40.type === "day") {
            return v40.value;
        }
    }
}
function toHex(a46) {
    s = a46.toString(16);
    return ("0").repeat(4 - s.length) + s;
}
const t20 = Intl.DateTimeFormat;
const v60 = new t20("bs-Cyrl-u-ca-persian");
var dateti1 = v60;
date2 = null;
for (let i65 = 0; i65 < 50; i65++) {
    let julianDay = 128202205 + (i65 * 31);
    let dayOfYear = compute(-julianDay);
    function f79() {
        return -28800000 - ((2440588 + julianDay) * 86400000);
    }
    const t30 = Date.prototype;
    t30["valueOf"] = f79;
    var d = dateti1.formatToParts(date2);
    dayOfMonth = getday(d);
    result = ((dayOfYear + 1) - dayOfMonth) & 65535;
    print(toHex(result));
}
