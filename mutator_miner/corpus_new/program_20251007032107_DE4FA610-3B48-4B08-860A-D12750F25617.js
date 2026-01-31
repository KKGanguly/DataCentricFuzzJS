let v5;
try { v5 = SIMD.Int32x4(1, 2, 3, 4); } catch (e) {}
var v = v5;
try { v.toLocaleString(1, 2, 3, 4); } catch (e) {}
