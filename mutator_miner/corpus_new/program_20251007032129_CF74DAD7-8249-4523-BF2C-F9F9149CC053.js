var key1 = {};
var key2 = {};
const v5 = new WeakMap();
var map = v5;
map.set(key1, 1);
map.delete(Object.assign(key2, key1));
