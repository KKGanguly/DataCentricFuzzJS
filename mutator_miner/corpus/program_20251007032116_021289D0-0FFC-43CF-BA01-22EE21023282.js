function createPropertiesAssignment(a1) {
    let result = "";
    for (let i5 = 0; i5 < a1; i5++) {
        result += ("this.p" + i5) + " = undefined;";
    }
    return result;
}
function testSubclassProtoProperties(a15) {
    const MyClass = eval(`(class MyClass {\n    constructor() {\n      ${createPropertiesAssignment(a15)}\n    }\n  });`);
    class C21 {
    }
    class C22 extends C21 {
        constructor() {
            super();
        }
    }
    const boundMyClass = MyClass.bind();
    const v26 = %HeapObjectVerify(boundMyClass);
    C22.__proto__ = boundMyClass;
    const v27 = new C22();
    var instance = v27;
    const v29 = %HeapObjectVerify(instance);
    let results = [];
    for (let i33 = 0; i33 < 4000; i33++) {
        const v39 = new C22();
        results.push(v39);
    }
    const v41 = new C22();
    var instance = v41;
    const v43 = %HeapObjectVerify(instance);
}
for (let i45 = 0; i45 < 10; i45++) {
    testSubclassProtoProperties(i45);
}
