const realm = Realm.createAllowCrossRealmAccess();
const global = Realm.global(realm);
function Base() {
    return global;
}
let i = 0;
const v8 = i++;
class C9 extends Base {
    field = v8;
}
const v10 = new C9();
let a = v10;
const v12 = new C9();
a = v12;
