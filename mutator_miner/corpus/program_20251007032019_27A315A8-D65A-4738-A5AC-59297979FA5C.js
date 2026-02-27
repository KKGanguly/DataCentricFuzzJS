function f1() {
    alert(this.script.sourceSlice().sourceText());
}
Object.prototype.__defineGetter__("line", f1);
