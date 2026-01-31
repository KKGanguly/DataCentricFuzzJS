function __f_0() {
    this.x = this?.x?.x;
}
try { gc(); } catch (e) {}
const v8 = { x: 1 };
const t5 = __f_0?.prototype;
t5.x = v8;
try { new __f_0(); } catch (e) {}
try { new __f_0(); } catch (e) {}
function __f_9(a13) {
    function __f_12() {
    }
    const v18 = {
        set x(a16) {
            this.y = 23;
        },
    };
    __f_12.prototype = v18;
    try { new __f_0(); } catch (e) {}
}
try { __f_9(); } catch (e) {}
try { __v_15.__defineGetter__(); } catch (e) {}
