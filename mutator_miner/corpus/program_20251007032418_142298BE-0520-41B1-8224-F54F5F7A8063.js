const v2 = new Array(1000000);
var ref = v2;
var rid = 0;
function major_gc() {
    new ArrayBuffer(2145386496);
}
function minor_gc() {
    for (let i12 = 0; i12 < 8; i12++) {
        const v20 = new ArrayBuffer(2097152);
        ref[i12] = v20;
    }
    const v23 = new ArrayBuffer(8);
    ref = v23;
}
const v27 = new RegExp("foo", "g");
var re = v27;
var tmp = re.exec;
var match_object = {};
function f33() {
    return "";
}
match_object[0] = { toString: f33 };
function f36() {
    major_gc();
    delete re.exec;
    re.lastIndex = 1073741823;
    new Array(4096);
    function f42() {
        throw "";
    }
    const t30 = RegExp.prototype;
    t30.exec = f42;
    return match_object;
}
re.exec = f36;
try {
    var newstr = re[Symbol.replace]("fooooo", ".$");
} catch(e51) {
}
minor_gc();
major_gc();
new Array(8192);
const v57 = %DebugPrint(re.lastIndex);
const v58 = %SystemBreak();
