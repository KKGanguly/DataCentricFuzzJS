({}).__proto__.__defineGetter__("x", Error.prototype.toString);
({}).x;
