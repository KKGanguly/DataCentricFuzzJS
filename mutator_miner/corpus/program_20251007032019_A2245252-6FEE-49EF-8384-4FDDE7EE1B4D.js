__v_2 = false;
let v4;
try { v4 = new Int32Array(1024); } catch (e) {}
var __v_0 = v4;
function __f_1(a7, a8, a9) {
    __v_0[a8 - 1] = 1;
    __v_0[a8 - 10] = 3;
    __v_0[a8 + 3] = 3;
    __v_0[a8 + 2] = 4;
    const v23 = a8 + 4;
    __v_0[a8 + 4] = v23;
    if (a9) {
        __v_0[a8 + 1] = 1;
    }
}
try { __f_1(__v_0, 11, true); } catch (e) {}
const v32 = %OptimizeFunctionOnNextCall(__f_1);
const v35 = -4;
try { __f_1(__v_1, v35, false); } catch (e) {}
let v40;
try { v40 = __f_9(3); } catch (e) {}
var __v_12 = v40;
let v44;
try { v44 = __f_13(true); } catch (e) {}
var __v_54 = v44;
let v48;
try { v48 = __f_32(12.3); } catch (e) {}
var __v_1 = v48;
