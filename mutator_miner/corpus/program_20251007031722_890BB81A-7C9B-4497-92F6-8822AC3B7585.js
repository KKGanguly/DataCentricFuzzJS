let badregexp = ("(?:" + (" ").repeat(32768 * 2)) + ")*";
reg = RegExp(badregexp);
try { reg.test(); } catch (e) {}
