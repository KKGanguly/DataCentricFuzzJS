var a = [0,1];
const v5 = Symbol.toPrimitive;
const v9 = {
    [v5]() {
        a.length = 1;
        return 2;
    },
};
var o = v9;
a.push(2);
a.lastIndexOf(5, o);
