var notCallable;
function inferReceiverMapsInDeadCode() {
    const v4 = {
        func() {
        },
    };
    var obj = v4;
    gc();
    function wrappedCode() {
        try {
            code();
        } catch(e11) {
        }
    }
    function code() {
        obj.a;
        try {
            const v16 = {
                get() {
                },
            };
            Object.defineProperty(obj, "func", v16);
        } catch(e19) {
        }
        for (let i21 = 0; i21 < 1; i21++) {
            try {
                notCallable(arguments[i21]);
            } catch(e30) {
            }
        }
    }
    wrappedCode();
    try {
        const v32 = %OptimizeFunctionOnNextCall(wrappedCode);
        wrappedCode();
    } catch(e34) {
    }
}
inferReceiverMapsInDeadCode();
inferReceiverMapsInDeadCode();
inferReceiverMapsInDeadCode();
