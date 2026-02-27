class C0 {
    constructor() {
        this.x = "A";
    }
    doitNormal() {
        return "A";
    }
    doitApply() {
        return "A";
    }
}
class C7 extends C0 {
    constructor() {
        super();
    }
    doit() {
    }
    doitNormal() {
        return super.doitNormal(this);
    }
    doitApply() {
        return super.doitApply.apply(this);
    }
}
const v15 = new C7();
var b = v15;
console.log("Normal: " + b.doitNormal());
console.log("Apply: " + b.doitApply());
