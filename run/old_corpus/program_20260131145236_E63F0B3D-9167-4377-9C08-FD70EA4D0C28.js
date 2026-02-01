PAGES = 10;
const v3 = WebAssembly.Memory;
const v7 = new v3({ initial: PAGES });
const v6 = v7;
memory = v6;
buffer = memory.buffer;
const v15 = new Uint8Array(buffer);
const v13 = v15;
buffer = v13;
try {
    memory.grow();
} catch(e18) {
}
WebAssembly.validate(buffer);
