PAGES = 10;
const v3 = WebAssembly.Memory;
const v6 = new v3({ initial: PAGES });
memory = v6;
buffer = memory.buffer;
const v13 = new Uint8Array(buffer);
buffer = v13;
try { memory.grow(); } catch (e) {}
WebAssembly.validate(buffer);
