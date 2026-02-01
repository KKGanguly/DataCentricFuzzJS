async function* asyncGenerator() {
}
let gen = asyncGenerator();
const v6 = {
    get then() {
        delete this.then;
        gen.next();
    },
};
gen.return(v6);
