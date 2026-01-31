async function bar() {
    const v3 = new Error("Whoops");
    throw v3;
}
async function foo() {
    try {
        await bar();
    } catch(e7) {
        console.log("Caught ");
    }
}
var oldThen = Promise.prototype.then;
function f15(a16, a17) {
    console.log(`then: ${a16}, catch: ${a17}`);
    oldThen.apply(this, [a16,a17]);
}
const t16 = Promise.prototype;
t16.then = f15;
foo();
