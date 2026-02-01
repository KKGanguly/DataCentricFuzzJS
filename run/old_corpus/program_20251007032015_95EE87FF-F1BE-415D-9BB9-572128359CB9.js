const v2 = new Array(65536);
let args = v2;
const v11 = ("new Array(" + (args = args.fill(4660).join(", "))) + ")";
try { eval(v11); } catch (e) {}
