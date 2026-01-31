let list = [];
let lists = [];
function addHandler() {
    for (const v5 of lists) {
        for (const v6 of v5) {
            const v7 = () => {
            };
            try { v6.catch(v7); } catch (e) {}
        }
    }
    lists = [];
}
function add(a11) {
    const v12 = () => {
        for (let i14 = 0; i14 < 100; i14++) {
            let v22;
            try { v22 = new Error("foo"); } catch (e) {}
            let v24;
            try { v24 = Promise.reject(v22); } catch (e) {}
            try { list.push(v24); } catch (e) {}
        }
        if (list?.length > a11) {
            try { lists.push(list); } catch (e) {}
            list = [];
            try { setTimeout(addHandler, 1); } catch (e) {}
        }
        try { add(a11); } catch (e) {}
    };
    try { setImmediate(v12); } catch (e) {}
}
try { add(1000); } catch (e) {}
