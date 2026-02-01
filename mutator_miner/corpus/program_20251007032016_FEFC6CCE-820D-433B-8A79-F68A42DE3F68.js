function getRandomProperty(a1, a2) {
    var properties = Object.getOwnPropertyNames(a1);
    return properties[a2 % properties.length];
}
r = Realm.create();
o = Realm.eval(r, "() => { return Realm.global(-10) instanceof Object }");
o.__p_211203344 = o[getRandomProperty(o, 211203344)];
