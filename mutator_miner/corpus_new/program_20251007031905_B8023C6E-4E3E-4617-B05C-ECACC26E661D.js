function KeyedStoreIC(a1) {
    a1[1] = Math.E;
}
var literal = [1.2];
literal.length = 0;
literal.push("0" && 0);
KeyedStoreIC(literal);
gc();
