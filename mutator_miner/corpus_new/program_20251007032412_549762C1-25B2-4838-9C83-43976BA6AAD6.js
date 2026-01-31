function main() {
    function test(a2, a3) {
        const v4 = async (a5, a6, a7) => {
            function v19() {
                try { JSON.stringify(this); } catch (e) {}
                try { a7(test); } catch (e) {}
            }
            try { Object.defineProperty(a7, a6, a3); } catch (e) {}
            try { new Promise(v19); } catch (e) {}
        };
        const v14 = v4;
        function v29() {
            const v20 = { get: v14 };
            let v21;
            try { v21 = new Proxy(test, v20); } catch (e) {}
            const t15 = a2?.__proto__;
            t15.__proto__ = v21;
        }
        try { v29(); } catch (e) {}
    }
    const v25 = {};
    try { test(isFinite, v25); } catch (e) {}
    try { undefined_function(); } catch (e) {}
}
try { main(); } catch (e) {}
