if (typeof fuzzilli === "undefined") {
    function f4() {
    }
    fuzzilli = f4;
}
function f5() {
    const ProxyConstructor = Proxy;
    const BigIntConstructor = BigInt;
    const SetConstructor = Set;
    const ObjectPrototype = Object.prototype;
    const getOwnPropertyNames = Object.getOwnPropertyNames;
    const getPrototypeOf = Object.getPrototypeOf;
    const setPrototypeOf = Object.setPrototypeOf;
    const stringify = JSON.stringify;
    const hasOwnProperty = Object.hasOwn;
    const defineProperty = Object.defineProperty;
    const propertyValues = Object.values;
    const parseInteger = parseInt;
    const NumberIsInteger = Number.isInteger;
    const isNaN = Number.isNaN;
    const isFinite = Number.isFinite;
    const truncate = Math.trunc;
    const apply = Reflect.apply;
    const construct = Reflect.construct;
    const ReflectGet = Reflect.get;
    const ReflectSet = Reflect.set;
    const ReflectHas = Reflect.has;
    const v55 = Array.prototype.concat;
    const concat = Function.prototype.call.bind(v55);
    const v62 = Array.prototype.findIndex;
    const findIndex = Function.prototype.call.bind(v62);
    const v68 = Array.prototype.includes;
    const includes = Function.prototype.call.bind(v68);
    const v74 = Array.prototype.shift;
    const shift = Function.prototype.call.bind(v74);
    const v80 = Array.prototype.pop;
    const pop = Function.prototype.call.bind(v80);
    const v86 = Array.prototype.push;
    const push = Function.prototype.call.bind(v86);
    const v92 = Array.prototype.filter;
    const filter = Function.prototype.call.bind(v92);
    const v99 = RegExp.prototype.exec;
    const execRegExp = Function.prototype.call.bind(v99);
    const v106 = String.prototype.slice;
    const stringSlice = Function.prototype.call.bind(v106);
    const v112 = String.prototype.toUpperCase;
    const toUpperCase = Function.prototype.call.bind(v112);
    const v118 = Number.prototype.toString;
    const numberToString = Function.prototype.call.bind(v118);
    const v124 = BigInt.prototype.toString;
    const bigintToString = Function.prototype.call.bind(v124);
    const v130 = String.prototype.startsWith;
    const stringStartsWith = Function.prototype.call.bind(v130);
    const v136 = Set.prototype.add;
    const setAdd = Function.prototype.call.bind(v136);
    const v142 = Set.prototype.has;
    const setHas = Function.prototype.call.bind(v142);
    const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
    const v153 = 2 ** 32;
    class C156 {
        m = v153;
        a = 1664525;
        c = 1013904223;
        x;
        constructor(a158) {
            this.x = a158;
        }
        randomInt() {
            this.x = ((this.x * this.a) + this.c) % this.m;
            if (!isInteger(this.x)) {
                throw "RNG state is not an Integer!";
            }
            return this.x;
        }
        randomFloat() {
            return this.randomInt() / this.m;
        }
        probability(a178) {
            return this.randomFloat() < a178;
        }
        reseed(a182) {
            this.x = a182;
        }
    }
    function EmptyArray() {
        let array = [];
        setPrototypeOf(array, null);
        return array;
    }
    function isObject(a189) {
        return typeof a189 === "object";
    }
    function isFunction(a194) {
        return typeof a194 === "function";
    }
    function isString(a199) {
        return typeof a199 === "string";
    }
    function isNumber(a204) {
        return typeof a204 === "number";
    }
    function isBigint(a209) {
        return typeof a209 === "bigint";
    }
    function isSymbol(a214) {
        return typeof a214 === "symbol";
    }
    function isBoolean(a219) {
        return typeof a219 === "boolean";
    }
    function isUndefined(a224) {
        return typeof a224 === "undefined";
    }
    function isInteger(a229) {
        return ((isNumber(a229) && NumberIsInteger(a229)) && (a229 >= MIN_SAFE_INTEGER)) && (a229 <= MAX_SAFE_INTEGER);
    }
    const simpleStringRegExp = /^[0-9a-zA-Z_$]+$/;
    function isSimpleString(a240) {
        if (!isString(a240)) {
            throw "Non-string argument to isSimpleString: " + a240;
        }
        return (a240.length < 50) && (execRegExp(simpleStringRegExp, a240) !== null);
    }
    function isNumericString(a253) {
        if (!isString(a253)) {
            return false;
        }
        let number = parseInteger(a253);
        return ((number >= MIN_SAFE_INTEGER) && (number <= MAX_SAFE_INTEGER)) && (numberToString(number) === a253);
    }
    function tryAccessProperty(a266, a267) {
        try {
            a267[a266];
            return true;
        } catch(e270) {
            return false;
        }
    }
    function tryHasProperty(a273, a274) {
        try {
            return a273 in a274;
        } catch(e276) {
            return false;
        }
    }
    function tryGetProperty(a279, a280) {
        try {
            return a280[a279];
        } catch(e282) {
            return undefined;
        }
    }
    function tryGetOwnPropertyNames(a285) {
        try {
            return getOwnPropertyNames(a285);
        } catch(e287) {
            const v288 = new Array();
            return v288;
        }
    }
    function tryGetPrototypeOf(a290) {
        try {
            return getPrototypeOf(a290);
        } catch(e292) {
            return null;
        }
    }
    function wrapInTryCatch(a295) {
        function f296() {
            try {
                return apply(a295, this, arguments);
            } catch(e300) {
                return false;
            }
        }
        return f296;
    }
    const v308 = new C156(truncate(Math.random() * (2 ** 32)));
    let rng = v308;
    function probability(a311) {
        if ((a311 < 0) || (a311 > 1)) {
            throw "Argument to probability must be a number between zero and one";
        }
        return rng.probability(a311);
    }
    function randomIntBetween(a320, a321) {
        if (!isInteger(a320) || !isInteger(a321)) {
            throw "Arguments to randomIntBetween must be integers";
        }
        return (rng.randomInt() % (a321 - a320)) + a320;
    }
    function randomFloat() {
        return rng.randomFloat();
    }
    function randomBigintBetween(a335, a336) {
        if (!isBigint(a335) || !isBigint(a336)) {
            throw "Arguments to randomBigintBetween must be bigints";
        }
        if (!isInteger(Number(a335)) || !isInteger(Number(a336))) {
            throw "Arguments to randomBigintBetween must be representable as regular intergers";
        }
        return BigIntConstructor(randomIntBetween(Number(a335), Number(a336)));
    }
    function randomIntBelow(a356) {
        if (!isInteger(a356)) {
            throw "Argument to randomIntBelow must be an integer";
        }
        return rng.randomInt() % a356;
    }
    function randomElement(a363) {
        return a363[randomIntBelow(a363.length)];
    }
    const PROPERTY_LOAD = "loads";
    const PROPERTY_STORE = "stores";
    const PROPERTY_NOT_FOUND = 0;
    const PROPERTY_FOUND = 1;
    let results = { __proto__: null };
    function reportError(a379) {
        fuzzilli("FUZZILLI_PRINT", "PROBING_ERROR: " + a379);
    }
    function reportResults() {
        fuzzilli("FUZZILLI_PRINT", "PROBING_RESULTS: " + stringify(results));
    }
    function recordAction(a391, a392, a393, a394) {
        let outcome = PROPERTY_NOT_FOUND;
        if (ReflectHas(a393, a394)) {
            outcome = PROPERTY_FOUND;
        }
        let keyString = a394;
        if (typeof keyString !== "string") {
            try {
                if (typeof (keyString = a394.toString()) !== "string") {
                    throw "not a string";
                }
            } catch(e406) {
                return;
            }
        }
        if ((!isSimpleString(keyString) && !isNumericString(keyString)) && !isSymbol(a394)) {
            return;
        }
        if (isSymbol(a394) && !stringStartsWith(keyString, "Symbol(Symbol.")) {
            return;
        }
        if (!hasOwnProperty(results, a392)) {
            const v423 = { __proto__: null };
            const v425 = { __proto__: null };
            results[a392] = { [PROPERTY_LOAD]: v423, [PROPERTY_STORE]: v425 };
        }
        const t250 = results[a392][a391];
        t250[keyString] = outcome;
    }
    function recordActionWithErrorHandling(a430, a431, a432, a433) {
        try {
            recordAction(a430, a431, a432, a433);
        } catch(e435) {
            reportError(e435);
        }
    }
    function probe(a438, a439) {
        let originalPrototype;
        let newPrototype;
        const v470 = {
            get(a445, a446, a447) {
                if ((a446 === "__proto__") && (a447 === a439)) {
                    return originalPrototype;
                }
                if (a447 === newPrototype) {
                    return ReflectGet(a445, a446);
                }
                recordActionWithErrorHandling(PROPERTY_LOAD, a438, a445, a446);
                return ReflectGet(a445, a446, a447);
            },
            set(a457, a458, a459, a460) {
                if (a460 === newPrototype) {
                    return ReflectSet(a457, a458, a459);
                }
                recordActionWithErrorHandling(PROPERTY_STORE, a438, a457, a458);
                return ReflectSet(a457, a458, a459, a460);
            },
            has(a466, a467) {
                recordActionWithErrorHandling(PROPERTY_LOAD, a438, a466, a467);
                return ReflectHas(a466, a467);
            },
        };
        let handler = v470;
        try {
            const v473 = new ProxyConstructor(originalPrototype = getPrototypeOf(a439), handler);
            setPrototypeOf(a439, newPrototype = v473);
        } catch(e475) {
        }
    }
    function probeWithErrorHandling(a477, a478) {
        try {
            probe(a477, a478);
        } catch(e480) {
            reportError(e480);
        }
    }
    return { probe: probeWithErrorHandling, reportResults: reportResults };
}
const Probe = f5();
const v1 = [true,true];
Probe.probe("v1", v1);
const v2 = [true];
Probe.probe("v2", v2);
[v2,v1,true,v2];
Probe.probe("v7", 3);
new BigInt64Array(3);
Probe.probe("v10", 6);
Probe.probe("v11", Uint16Array);
new Uint16Array(6);
Probe.probe("v13", 4096);
Probe.probe("v14", Uint8Array);
new Uint8Array(4096);
function f16(a521, a522) {
    Probe.probe("v19", 0);
    return 0 & a522;
}
Probe.probe("v16", f16);
let v21 = 0;
Probe.probe("v21", v21);
function f22() {
    for (let i536 = 0;
        (() => {
            const v537 = () => {
                Probe.probe("v24", i536);
                Probe.probe("v25", 100);
                return i536 < 100;
            };
            return v537();
        })();
        (() => {
            const v547 = () => {
                Probe.probe("v27", i536);
                i536++;
            };
            v547();
        })()) {
        Probe.probe("v29", i536);
        f16(i536, i536);
        function f31() {
            v21++;
            return 0;
        }
        const o34 = { valueOf: f31 };
        f16(i536, o34);
    }
}
Probe.probe("v22", f22);
f22();
function f38(a566, a567) {
    Probe.probe("v40", a567);
    ~a567;
}
let v42 = 0;
Probe.probe("v42", v42);
function f43() {
    for (let i577 = 0;
        (() => {
            const v578 = () => {
                Probe.probe("v45", i577);
                Probe.probe("v46", 100);
                return i577 < 100;
            };
            return v578();
        })();
        i577++) {
        f38(i577, i577);
        function f52() {
            v42++;
            return 0;
        }
        Probe.probe("v52", f52);
        const o55 = { valueOf: f52 };
        f38(i577, o55);
    }
}
f43();
function f59(a601, a602) {
    Probe.probe("v62", 0);
    return 0 >>> a602;
}
let v64 = 0;
function f65() {
    for (let i612 = 0;
        (() => {
            const v613 = () => {
                Probe.probe("v68", 100);
                return i612 < 100;
            };
            return v613();
        })();
        (() => {
            const v621 = () => {
                Probe.probe("v70", i612);
                i612++;
            };
            v621();
        })()) {
        Probe.probe("v72", i612);
        f59(i612, i612);
        function f74() {
            v64++;
            Probe.probe("v76", 0);
            return 0;
        }
        const o77 = { valueOf: f74 };
        f59(i612, o77);
    }
}
Probe.probe("v65", f65);
f65();
Probe.reportResults();
