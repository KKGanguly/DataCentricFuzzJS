eval(`(function f() {\n    with ({}) {\n        (function () {\n            print(f);\n        })();\n    }\n}());` + ("\n").repeat(4096));
