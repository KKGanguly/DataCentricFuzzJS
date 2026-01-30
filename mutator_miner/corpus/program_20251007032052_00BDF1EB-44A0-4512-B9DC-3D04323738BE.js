function f0() {
}
function f() {
    const v3 = arguments?.length;
    try { f0(v3); } catch (e) {}
}
var a = Array(2 ** 16).fill(null);
const v13 = f.bind;
let v14;
try { v14 = v13.apply(f, a); } catch (e) {}
var bf = v14;
try { bf(); } catch (e) {}
