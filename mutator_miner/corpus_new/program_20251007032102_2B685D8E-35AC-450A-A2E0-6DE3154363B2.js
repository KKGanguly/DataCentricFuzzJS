function TestTableSetAndGetFunction() {
    const v2 = WebAssembly.Function;
    const v3 = [];
    const v4 = [];
    const v5 = { parameters: v3, results: v4 };
    const v6 = (a7) => {
        return a7;
    };
    let v8;
    try { v8 = new v2(v5, v6); } catch (e) {}
    let func = v8;
    const v10 = WebAssembly.Table;
    const v14 = new v10({ element: "anyfunc", initial: 1 });
    let table = v14;
    try { table.set(0, func); } catch (e) {}
    table.get(0);
}
TestTableSetAndGetFunction();
