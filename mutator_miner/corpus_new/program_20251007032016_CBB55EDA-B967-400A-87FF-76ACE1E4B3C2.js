function KeyedStoreIC(a1) {
    a1[0] = Math.E;
}
var literal = [1.2];
KeyedStoreIC(literal);
KeyedStoreIC(literal);
literal.length = 0;
literal.push(Math.E, Math.E);
KeyedStoreIC(literal);
gc();
