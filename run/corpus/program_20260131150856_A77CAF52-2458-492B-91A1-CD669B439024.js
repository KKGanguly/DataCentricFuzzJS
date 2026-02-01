function foo() {
    for (let i2 = 0; i2 < 4096; i2++) {
        const obj3 = [13.37,13.37,13.37,13.37];
        let obj4 = 1;
        function obj5(a17, a18, a19, a20) {
            for (const v21 of obj3) {
                const obj15 = [,,,"foo"];
                let obj16 = 0;
                function obj17() {
                    const obj18 = obj16++;
                    let v32;
                    try { v32 = Math.ceil(); } catch (e) {}
                    const obj22 = v32;
                    obj4 = obj22;
                }
                let v34;
                try { v34 = obj15.findIndex(obj17); } catch (e) {}
                const obj23 = v34;
                const obj25 = [1337,1337,1337,1337,1337];
                const obj28 = [1024,2,0];
                for (const v48 of obj28) {
                    const obj32 = [1,2,obj23];
                    for (const v53 of obj32) {
                        const obj36 = [1,obj25,3];
                        for (const v58 of obj36) {
                            const obj38 = v48 < v53;
                            const obj39 = v21 !== a18;
                        }
                    }
                }
            }
        }
        let v63;
        try { v63 = obj5(); } catch (e) {}
        const obj40 = v63;
    }
}
try { foo(); } catch (e) {}
