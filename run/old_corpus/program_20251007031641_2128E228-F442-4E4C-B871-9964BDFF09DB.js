let v2;
try { v2 = read("very-large-json-with-numbers.json"); } catch (e) {}
let content = v2;
try { JSON.parse(content); } catch (e) {}
