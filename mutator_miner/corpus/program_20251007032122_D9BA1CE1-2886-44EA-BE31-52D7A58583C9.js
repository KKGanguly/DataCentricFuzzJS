const v3 = {
    toString() {
        return Symbol();
    },
};
var key = v3;
var obj = {};
obj[key];
