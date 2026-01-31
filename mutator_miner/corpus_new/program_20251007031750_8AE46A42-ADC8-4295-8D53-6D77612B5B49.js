function opt() {
    try {
        Object.seal({});
    } finally {
        try {
            const v5 = -1;
            const v7 = {
                toString() {
                },
            };
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
const v14 = %OptimizeFunctionOnNextCall(opt);
opt();
