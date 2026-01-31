function CleanUp() {
    print("CleanUp");
}
const v5 = new FinalizationRegistry(CleanUp);
const registry = v5;
let target = {};
let unreg_token = {};
registry.register(target, undefined, unreg_token);
for (let i14 = 0; i14 < 2; i14++) {
    Object.assign(unreg_token, {});
}
target = undefined;
gc({ type: "major" });
