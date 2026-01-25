var ARROW_ARG = /^([^\(]+?)=>/;
const v2 = (a3) => {
    a3();
};
var fn = v2;
var args = fn.toString().match(ARROW_ARG);
var args2 = fn.toString().match(ARROW_ARG);
