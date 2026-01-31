const v2 = new ArrayBuffer(65536);
var buffer = v2;
const v5 = new Uint32Array(buffer);
var view = v5;
let v9;
try { v9 = new Worker("uaf1.js"); } catch (e) {}
var worker = v9;
const v11 = [buffer];
try { worker.postMessage(buffer, v11); } catch (e) {}
try { worker.terminate(); } catch (e) {}
