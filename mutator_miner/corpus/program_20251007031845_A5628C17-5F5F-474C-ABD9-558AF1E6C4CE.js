let object = {};
Intl.NumberFormat.apply(object);
Intl.DateTimeFormat.apply(object);
const v9 = Intl.DateTimeFormat.prototype.formatToParts;
try { v9.apply(object); } catch (e) {}
