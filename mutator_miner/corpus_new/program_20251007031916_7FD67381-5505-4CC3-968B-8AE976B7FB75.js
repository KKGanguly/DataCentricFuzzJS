function setupShim() {
    console.log("Shimming Array.splice()");
    var oldSplice = ([]).__proto__.splice;
    function f8(a9, a10) {
        if ((((((a9 < 0) || (a9 > (this.length - 1))) || (a10 === undefined)) || (a10 < 0)) || ((a9 + a10) > this.length)) || (arguments.length > 2)) {
            return oldSplice.apply(this, arguments);
        }
        const v39 = new Array(a10);
        var retval = v39;
        for (let i42 = 0; (i42 < a10) && (i42 < this.length); i42++) {
            retval = this[a9 + i42];
            this[a9 + i42] = null;
        }
        oldSplice.apply(this, arguments);
        return retval;
    }
    var newSplice = f8;
    const t17 = ([]).__proto__;
    t17.splice = newSplice;
}
