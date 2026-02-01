var a = [0,1];
const v5 = Symbol.toPrimitive;
const v10 = {
    [v5]() {
        a.length = 1;
        return 2;
    },
};
const v9 = v10;
var o = v9;
a.push(2);
a.lastIndexOf(5, o);
