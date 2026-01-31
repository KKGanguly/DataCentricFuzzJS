let v2;
try { v2 = ("x").repeat(2147483647); } catch (e) {}
var s = v2;
try { s.link(s); } catch (e) {}
