const realm = Realm.createAllowCrossRealmAccess();
const global = Realm.global(realm);
function Base() {
    return global;
}
let i = 0;
const v8 = i++;
class C10 extends Base {
    field = v8;
}
const v11 = new C10();
const v10 = v11;
let a = v10;
const v14 = new C10();
const v12 = v14;
a = v12;
