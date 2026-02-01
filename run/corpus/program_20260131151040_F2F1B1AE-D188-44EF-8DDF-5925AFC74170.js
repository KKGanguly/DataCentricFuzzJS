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
    class C172 {
        m = v153;
        a = 1664525;
        c = 1013904223;
        x;
        constructor(a174) {
            this.x = a174;
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
        probability(a194) {
            return this.randomFloat() < a194;
        }
        reseed(a198) {
            this.x = a198;
        }
    }
    function EmptyArray() {
        let array = [];
        setPrototypeOf(array, null);
        return array;
    }
    function isObject(a205) {
        return typeof a205 === "object";
    }
    function isFunction(a210) {
        return typeof a210 === "function";
    }
    function isString(a215) {
        return typeof a215 === "string";
    }
    function isNumber(a220) {
        return typeof a220 === "number";
    }
    function isBigint(a225) {
        return typeof a225 === "bigint";
    }
    function isSymbol(a230) {
        return typeof a230 === "symbol";
    }
    function isBoolean(a235) {
        return typeof a235 === "boolean";
    }
    function isUndefined(a240) {
        return typeof a240 === "undefined";
    }
    function isInteger(a245) {
        return ((isNumber(a245) && NumberIsInteger(a245)) && (a245 >= MIN_SAFE_INTEGER)) && (a245 <= MAX_SAFE_INTEGER);
    }
    const simpleStringRegExp = /^[0-9a-zA-Z_$]+$/;
    function isSimpleString(a256) {
        if (!isString(a256)) {
            throw "Non-string argument to isSimpleString: " + a256;
        }
        return (a256.length < 50) && (execRegExp(simpleStringRegExp, a256) !== null);
    }
    function isNumericString(a269) {
        if (!isString(a269)) {
            return false;
        }
        let number = parseInteger(a269);
        return ((number >= MIN_SAFE_INTEGER) && (number <= MAX_SAFE_INTEGER)) && (numberToString(number) === a269);
    }
    function tryAccessProperty(a282, a283) {
        try {
            a283[a282];
            return true;
        } catch(e286) {
            return false;
        }
    }
    function tryHasProperty(a289, a290) {
        try {
            return a289 in a290;
        } catch(e292) {
            return false;
        }
    }
    function tryGetProperty(a295, a296) {
        try {
            return a296[a295];
        } catch(e298) {
            return undefined;
        }
    }
    function tryGetOwnPropertyNames(a301) {
        try {
            return getOwnPropertyNames(a301);
        } catch(e303) {
            const v304 = new Array();
            const v288 = v304;
            return v288;
        }
    }
    function tryGetPrototypeOf(a307) {
        try {
            return getPrototypeOf(a307);
        } catch(e309) {
            return null;
        }
    }
    function wrapInTryCatch(a312) {
        function f296() {
            try {
                return apply(a312, this, arguments);
            } catch(e317) {
                return false;
            }
        }
        return f296;
    }
    const v325 = new C172(truncate(Math.random() * (2 ** 32)));
    const v308 = v325;
    let rng = v308;
    function probability(a329) {
        if ((a329 < 0) || (a329 > 1)) {
            throw "Argument to probability must be a number between zero and one";
        }
        return rng.probability(a329);
    }
    function randomIntBetween(a338, a339) {
        if (!isInteger(a338) || !isInteger(a339)) {
            throw "Arguments to randomIntBetween must be integers";
        }
        return (rng.randomInt() % (a339 - a338)) + a338;
    }
    function randomFloat() {
        return rng.randomFloat();
    }
    function randomBigintBetween(a353, a354) {
        if (!isBigint(a353) || !isBigint(a354)) {
            throw "Arguments to randomBigintBetween must be bigints";
        }
        if (!isInteger(Number(a353)) || !isInteger(Number(a354))) {
            throw "Arguments to randomBigintBetween must be representable as regular intergers";
        }
        return BigIntConstructor(randomIntBetween(Number(a353), Number(a354)));
    }
    function randomIntBelow(a374) {
        if (!isInteger(a374)) {
            throw "Argument to randomIntBelow must be an integer";
        }
        return rng.randomInt() % a374;
    }
    function randomElement(a381) {
        return a381[randomIntBelow(a381.length)];
    }
    const PROPERTY_LOAD = "loads";
    const PROPERTY_STORE = "stores";
    const PROPERTY_NOT_FOUND = 0;
    const PROPERTY_FOUND = 1;
    let results = { __proto__: null };
    function reportError(a397) {
        fuzzilli("FUZZILLI_PRINT", "PROBING_ERROR: " + a397);
    }
    function reportResults() {
        fuzzilli("FUZZILLI_PRINT", "PROBING_RESULTS: " + stringify(results));
    }
    function recordAction(a409, a410, a411, a412) {
        let outcome = PROPERTY_NOT_FOUND;
        if (ReflectHas(a411, a412)) {
            outcome = PROPERTY_FOUND;
        }
        let keyString = a412;
        if (typeof keyString !== "string") {
            try {
                const v419 = a412.toString();
                keyString = v419;
                if (typeof v419 !== "string") {
                    throw "not a string";
                }
            } catch(e424) {
                return;
            }
        }
        if ((!isSimpleString(keyString) && !isNumericString(keyString)) && !isSymbol(a412)) {
            return;
        }
        if (isSymbol(a412) && !stringStartsWith(keyString, "Symbol(Symbol.")) {
            return;
        }
        if (!hasOwnProperty(results, a410)) {
            const v423 = { __proto__: null };
            const v425 = { __proto__: null };
            results[a410] = { [PROPERTY_LOAD]: v423, [PROPERTY_STORE]: v425 };
        }
        const t250 = results[a410][a409];
        t250[keyString] = outcome;
    }
    function recordActionWithErrorHandling(a451, a452, a453, a454) {
        try {
            recordAction(a451, a452, a453, a454);
        } catch(e456) {
            reportError(e456);
        }
    }
    function probe(a459, a460) {
        let originalPrototype;
        let newPrototype;
        const v491 = {
            get(a466, a467, a468) {
                if ((a467 === "__proto__") && (a468 === a460)) {
                    return originalPrototype;
                }
                if (a468 === newPrototype) {
                    return ReflectGet(a466, a467);
                }
                recordActionWithErrorHandling(PROPERTY_LOAD, a459, a466, a467);
                return ReflectGet(a466, a467, a468);
            },
            set(a478, a479, a480, a481) {
                if (a481 === newPrototype) {
                    return ReflectSet(a478, a479, a480);
                }
                recordActionWithErrorHandling(PROPERTY_STORE, a459, a478, a479);
                return ReflectSet(a478, a479, a480, a481);
            },
            has(a487, a488) {
                recordActionWithErrorHandling(PROPERTY_LOAD, a459, a487, a488);
                return ReflectHas(a487, a488);
            },
        };
        const v470 = v491;
        let handler = v470;
        try {
            const v494 = getPrototypeOf(a460);
            originalPrototype = v494;
            const v495 = new ProxyConstructor(v494, handler);
            const v473 = v495;
            newPrototype = v473;
            setPrototypeOf(a460, v473);
        } catch(e498) {
        }
    }
    function probeWithErrorHandling(a500, a501) {
        try {
            probe(a500, a501);
        } catch(e503) {
            reportError(e503);
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
function f16(a544, a545) {
    Probe.probe("v19", 0);
    return 0 & a545;
}
Probe.probe("v16", f16);
let v21 = 0;
Probe.probe("v21", v21);
function f22() {
    for (let i559 = 0;
        (() => {
            const v560 = () => {
                const v561 = () => {
                    Probe.probe("v24", i559);
                    Probe.probe("v25", 100);
                    return i559 < 100;
                };
                const v537 = v561;
                return v537();
            };
            return v560();
        })();
        (() => {
            const v573 = () => {
                const v574 = () => {
                    Probe.probe("v27", i559);
                    i559++;
                };
                const v547 = v574;
                v547();
            };
            v573();
        })()) {
        Probe.probe("v29", i559);
        f16(i559, i559);
        function f31() {
            v21++;
            return 0;
        }
        const o34 = { valueOf: f31 };
        f16(i559, o34);
    }
}
Probe.probe("v22", f22);
f22();
function f38(a595, a596) {
    Probe.probe("v40", a596);
    ~a596;
}
let v42 = 0;
Probe.probe("v42", v42);
function f43() {
    for (let i606 = 0;
        (() => {
            const v607 = () => {
                const v608 = () => {
                    Probe.probe("v45", i606);
                    Probe.probe("v46", 100);
                    return i606 < 100;
                };
                const v578 = v608;
                return v578();
            };
            return v607();
        })();
        i606++) {
        f38(i606, i606);
        function f52() {
            v42++;
            return 0;
        }
        Probe.probe("v52", f52);
        const o55 = { valueOf: f52 };
        f38(i606, o55);
    }
}
f43();
function f59(a633, a634) {
    Probe.probe("v62", 0);
    return 0 >>> a634;
}
let v64 = 0;
function f65() {
    for (let i644 = 0;
        (() => {
            const v645 = () => {
                const v646 = () => {
                    Probe.probe("v68", 100);
                    return i644 < 100;
                };
                const v613 = v646;
                return v613();
            };
            return v645();
        })();
        (() => {
            const v656 = () => {
                const v657 = () => {
                    Probe.probe("v70", i644);
                    i644++;
                };
                const v621 = v657;
                v621();
            };
            v656();
        })()) {
        Probe.probe("v72", i644);
        f59(i644, i644);
        function f74() {
            v64++;
            Probe.probe("v76", 0);
            return 0;
        }
        const o77 = { valueOf: f74 };
        f59(i644, o77);
    }
}
Probe.probe("v65", f65);
f65();
Probe.reportResults();
