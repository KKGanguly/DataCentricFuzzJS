let v2;
try { v2 = Symbol(); } catch (e) {}
const v3 = [v2];
try { new SharedStructType(v3); } catch (e) {}
