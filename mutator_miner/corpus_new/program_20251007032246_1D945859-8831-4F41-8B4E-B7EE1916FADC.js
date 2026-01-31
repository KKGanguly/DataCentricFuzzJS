if (this.Worker) {
    function f0() {
        var v0 = `onmessage = function(m) {\n          var sab = m;\n          var ta = new Uint32Array(sab);\n        };`;
        new Worker(v0, { type: "string" });
        try { quit(); } catch (e) {}
    }
    try { f0(); } catch (e) {}
}
