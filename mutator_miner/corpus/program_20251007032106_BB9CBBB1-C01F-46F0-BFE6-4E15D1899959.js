const num_iterations = 1000;
let i = 0;
const re = /foo.bar/;
const RegExpPrototypeExec = RegExp.prototype.exec;
function gaga(a11) {
    return i++ < num_iterations ? RegExpPrototypeExec.call(re, a11) : null;
}
re.exec = gaga;
const v18 = () => {
    return true;
};
re.__defineGetter__("global", v18);
("foo*bar").match(re);
