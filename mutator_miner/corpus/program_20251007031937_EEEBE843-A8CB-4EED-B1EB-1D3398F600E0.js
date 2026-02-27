let v3;
try { v3 = new OffscreenCanvas(10, 10); } catch (e) {}
canvas = v3;
function f6() {
}
try { canvas.addEventListener("webglcontextlost", f6); } catch (e) {}
try { gc(); } catch (e) {}
try { gc(); } catch (e) {}
