let obj = {};
Object.defineProperty(obj, "__proto__", { enumerable: true, writable: true });
Object.assign({}, obj);
Object.defineProperty(obj, "__proto__", { value: 0 });
