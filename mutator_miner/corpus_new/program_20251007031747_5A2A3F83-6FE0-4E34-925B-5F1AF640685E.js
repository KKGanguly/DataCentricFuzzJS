let constant = { a: 1 };
function update_array(a4) {
    a4.x = constant;
    const v5 = %HeapObjectVerify(a4);
    a4[0] = undefined;
    const v7 = %HeapObjectVerify(a4);
    return a4;
}
let ar1 = [1];
let ar2 = [2];
let ar3 = [3];
gc();
gc();
update_array(ar1);
constant = update_array(ar2);
update_array(ar3);
