function opt() {
    try {
        Object.seal({});
    } finally {
        try {
            const v5 = -1;
            const v8 = {
                toString() {
                },
            };
            const v7 = v8;
            v7.apply(v5).x();
        } finally {
            if (2.2) {
                return;
            }
            try {
                Reflect.construct;
            } finally {
            }
        }
    }
}
opt();
const v16 = %OptimizeFunctionOnNextCall(opt);
const v14 = v16;
opt();
