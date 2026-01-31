try {
    Wasm.instantiateModuleFromAsm("");
    assertTrue(false);
} catch(e6) {
    print("Caught: " + e6);
}
