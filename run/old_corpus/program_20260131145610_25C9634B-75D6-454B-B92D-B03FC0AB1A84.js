function f0() {
    const ProxyConstructor = Proxy;
    const ReflectGet = Reflect.get;
    const ReflectSet = Reflect.set;
    const ReflectHas = Reflect.has;
    const hasOwnProperty = Object.hasOwn;
    const getPrototypeOf = Object.getPrototypeOf;
    const setPrototypeOf = Object.setPrototypeOf;
    const stringify = JSON.stringify;
    const parseInteger = parseInt;
    const v26 = RegExp.prototype[Symbol.match];
    const match = Function.prototype.call.bind(v26);
    const v34 = Number.prototype.toString;
    const numberToString = Function.prototype.call.bind(v34);
    const v41 = String.prototype.startsWith;
    const stringStartsWith = Function.prototype.call.bind(v41);
    const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
    const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
    const PROPERTY_LOAD = "loads";
    const PROPERTY_STORE = "stores";
    const PROPERTY_NOT_FOUND = 0;
    const PROPERTY_FOUND = 1;
    function isSimpleString(a62) {
        if (typeof a62 !== "string") {
            return false;
        }
        return (a62.length < 50) && match(/^[0-9a-zA-Z_$]+$/, a62);
    }
    function isNumericString(a74) {
        if (typeof a74 !== "string") {
            return false;
        }
        let number = parseInteger(a74);
        return ((number >= MIN_SAFE_INTEGER) && (number <= MAX_SAFE_INTEGER)) && (numberToString(number) === a74);
    }
    function isSymbol(a88) {
        return typeof a88 === "symbol";
    }
    let results = { __proto__: null };
    function reportError(a96) {
        fuzzilli("FUZZILLI_PRINT", "PROBING_ERROR: " + a96);
    }
    function reportResults() {
        fuzzilli("FUZZILLI_PRINT", "PROBING_RESULTS: " + stringify(results));
    }
    function recordAction(a110, a111, a112, a113) {
        let outcome = PROPERTY_NOT_FOUND;
        if (ReflectHas(a112, a113)) {
            outcome = PROPERTY_FOUND;
        }
        let keyString = a113;
        if (typeof keyString !== "string") {
            try {
                const v120 = a113.toString();
                keyString = v120;
                if (typeof v120 !== "string") {
                    throw "not a string";
                }
            } catch(e125) {
                return;
            }
        }
        if ((!isSimpleString(keyString) && !isNumericString(keyString)) && !isSymbol(a113)) {
            return;
        }
        if (isSymbol(a113) && !stringStartsWith(keyString, "Symbol(Symbol.")) {
            return;
        }
        if (!hasOwnProperty(results, a111)) {
            const v139 = { __proto__: null };
            const v141 = { __proto__: null };
            results[a111] = { [PROPERTY_LOAD]: v139, [PROPERTY_STORE]: v141 };
        }
        const t71 = results[a111][a110];
        t71[keyString] = outcome;
    }
    function recordActionWithErrorHandling(a152, a153, a154, a155) {
        try {
            recordAction(a152, a153, a154, a155);
        } catch(e157) {
            reportError(e157);
        }
    }
    function probe(a160, a161) {
        let originalPrototype;
        let newPrototype;
        const v192 = {
            get(a167, a168, a169) {
                if ((a168 === "__proto__") && (a169 === a161)) {
                    return originalPrototype;
                }
                if (a169 === newPrototype) {
                    return ReflectGet(a167, a168);
                }
                recordActionWithErrorHandling(PROPERTY_LOAD, a160, a167, a168);
                return ReflectGet(a167, a168, a169);
            },
            set(a179, a180, a181, a182) {
                if (a182 === newPrototype) {
                    return ReflectSet(a179, a180, a181);
                }
                recordActionWithErrorHandling(PROPERTY_STORE, a160, a179, a180);
                return ReflectSet(a179, a180, a181, a182);
            },
            has(a188, a189) {
                recordActionWithErrorHandling(PROPERTY_LOAD, a160, a188, a189);
                return ReflectHas(a188, a189);
            },
        };
        const v186 = v192;
        let handler = v186;
        try {
            const v195 = getPrototypeOf(a161);
            originalPrototype = v195;
            const v196 = new ProxyConstructor(v195, handler);
            const v189 = v196;
            newPrototype = v189;
            setPrototypeOf(a161, v189);
        } catch(e199) {
        }
    }
    function probeWithErrorHandling(a201, a202) {
        try {
            probe(a201, a202);
        } catch(e204) {
            reportError(e204);
        }
    }
    return { probe: probeWithErrorHandling, reportResults: reportResults };
}
const Probe = f0();
function main() {
    for (let i211 = 0; i211 < 573; i211++) {
        async function v1(a218, a219, a220) {
            Probe.probe("v3", a219);
            try {
                let v6 = 512;
                const v7 = --v6;
                const v8 = ~v6;
                const v9 = Math.round(v8);
            } finally {
            }
            return i211;
        }
        const v10 = v1();
    }
}
main();
Probe.reportResults();
