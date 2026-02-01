async function* gen() {
    const v1 = () => {
    };
    const v2 = v1;
    const v4 = new Promise(v2);
    const v3 = v4;
    const alwaysPending = v3;
    alwaysPending.then = "non-callable then";
    yield alwaysPending;
}
gen().next();
