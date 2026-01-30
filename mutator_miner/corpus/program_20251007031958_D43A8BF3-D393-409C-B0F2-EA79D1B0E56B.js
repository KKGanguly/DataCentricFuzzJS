async function* gen() {
    const v2 = () => {
    };
    const v3 = new Promise(v2);
    const alwaysPending = v3;
    alwaysPending.then = "non-callable then";
    yield alwaysPending;
}
gen().next();
