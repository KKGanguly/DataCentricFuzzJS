const v3 = %SetAllocationTimeout(20, 0, false);
for (let i5 = 0; i5 < 10000; ++i5) {
    function f() {
        return i5;
    }
}
const v12 = %SimulateNewspaceFull();
