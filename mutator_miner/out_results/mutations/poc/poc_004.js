// Create an Error instance. Error instances have an own property 'stack'
// which is an accessor backed by a FunctionTemplateInfo (API accessor).
const err = new Error();

class err {
  m() {
    // Access 'stack' via super.
    // The lookup starts at the prototype of err.prototype.
    return super.stack;
  }
}

// Set the prototype of err.prototype to the Error instance.
// Now, the super lookup will start at 'err'.
Object.setPrototypeOf(err.prototype, err);

const b = new err();

// Call the method m with a primitive receiver.
// This triggers LoadSuperIC and ultimately calls CallGetterIfAccessor with a
// Smi as receiver and the default kExpectingJSReceiver mode.
b.m.call(0x4141414 >> 1);