let args = [3.34];
function f(a4, a5, a6) {
}
f(...args);
args = args.splice();
f(...args);
args = [];
f(...args);
