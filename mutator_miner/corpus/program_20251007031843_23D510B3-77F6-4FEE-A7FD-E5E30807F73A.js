let arr = [];
arr[1000] = 321321;
let proto = {};
function f6() {
    arr[2000] = 1094795585;
    return 123;
}
Object.defineProperty(proto, "0", { get: f6 });
arr.__proto__ = proto;
const v14 = Array.prototype.reverse;
try { v14.call(arr); } catch (e) {}
const v17 = Array.prototype.sort;
try { v17.call(arr); } catch (e) {}
