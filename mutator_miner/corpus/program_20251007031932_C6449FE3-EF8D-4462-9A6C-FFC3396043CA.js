function f0() {
}
Realm.createAllowCrossRealmAccess();
Realm.detachGlobal(1);
const global_var = Realm.global(1);
function f() {
    return global_var.__proto__;
}
const v10 = %EnsureFeedbackVectorForFunction(f);
f0(f);
f0(f);
