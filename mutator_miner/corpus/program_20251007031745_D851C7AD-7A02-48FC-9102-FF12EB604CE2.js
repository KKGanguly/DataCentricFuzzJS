const v1 = new Boolean();
var __v_6 = v1;
__v_6.first = 0;
__v_6.prop = 1;
for (const v5 in __v_6) {
    delete __v_6.prop;
    gc();
}
