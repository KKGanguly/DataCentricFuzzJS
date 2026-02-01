function f0() {
    return "https://www.google.com/";
}
const t3 = Object?.prototype;
t3[Symbol?.toPrimitive] = f0;
try { alert(location); } catch (e) {}
