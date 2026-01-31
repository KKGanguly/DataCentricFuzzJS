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
    function isSimpleString(a59) {
        if (typeof a59 !== "string") {
            return false;
        }
        return (a59.length < 50) && match(/^[0-9a-zA-Z_$]+$/, a59);
    }
    function isNumericString(a71) {
        if (typeof a71 !== "string") {
            return false;
        }
        let number = parseInteger(a71);
        return ((number >= MIN_SAFE_INTEGER) && (number <= MAX_SAFE_INTEGER)) && (numberToString(number) === a71);
    }
    function isSymbol(a85) {
        return typeof a85 === "symbol";
    }
    let results = { __proto__: null };
    function reportError(a93) {
        fuzzilli("FUZZILLI_PRINT", "PROBING_ERROR: " + a93);
    }
    function reportResults() {
        fuzzilli("FUZZILLI_PRINT", "PROBING_RESULTS: " + stringify(results));
    }
    function recordAction(a107, a108, a109, a110) {
        let outcome = PROPERTY_NOT_FOUND;
        if (ReflectHas(a109, a110)) {
            outcome = PROPERTY_FOUND;
        }
        let keyString = a110;
        if (typeof keyString !== "string") {
            try {
                if (typeof (keyString = a110.toString()) !== "string") {
                    throw "not a string";
                }
            } catch(e122) {
                return;
            }
        }
        if ((!isSimpleString(keyString) && !isNumericString(keyString)) && !isSymbol(a110)) {
            return;
        }
        if (isSymbol(a110) && !stringStartsWith(keyString, "Symbol(Symbol.")) {
            return;
        }
        if (!hasOwnProperty(results, a108)) {
            const v139 = { __proto__: null };
            const v141 = { __proto__: null };
            results[a108] = { [PROPERTY_LOAD]: v139, [PROPERTY_STORE]: v141 };
        }
        const t71 = results[a108][a107];
        t71[keyString] = outcome;
    }
    function recordActionWithErrorHandling(a146, a147, a148, a149) {
        try {
            recordAction(a146, a147, a148, a149);
        } catch(e151) {
            reportError(e151);
        }
    }
    function probe(a154, a155) {
        let originalPrototype;
        let newPrototype;
        const v186 = {
            get(a161, a162, a163) {
                if ((a162 === "__proto__") && (a163 === a155)) {
                    return originalPrototype;
                }
                if (a163 === newPrototype) {
                    return ReflectGet(a161, a162);
                }
                recordActionWithErrorHandling(PROPERTY_LOAD, a154, a161, a162);
                return ReflectGet(a161, a162, a163);
            },
            set(a173, a174, a175, a176) {
                if (a176 === newPrototype) {
                    return ReflectSet(a173, a174, a175);
                }
                recordActionWithErrorHandling(PROPERTY_STORE, a154, a173, a174);
                return ReflectSet(a173, a174, a175, a176);
            },
            has(a182, a183) {
                recordActionWithErrorHandling(PROPERTY_LOAD, a154, a182, a183);
                return ReflectHas(a182, a183);
            },
        };
        let handler = v186;
        try {
            const v189 = new ProxyConstructor(originalPrototype = getPrototypeOf(a155), handler);
            setPrototypeOf(a155, newPrototype = v189);
        } catch(e191) {
        }
    }
    function probeWithErrorHandling(a193, a194) {
        try {
            probe(a193, a194);
        } catch(e196) {
            reportError(e196);
        }
    }
    return { probe: probeWithErrorHandling, reportResults: reportResults };
}
const Probe = f0();
function main() {
    for (let i203 = 0; i203 < 573; i203++) {
        async function v1(a210, a211, a212) {
            Probe.probe("v3", a211);
            try {
                let v6 = 512;
                const v7 = --v6;
                const v8 = ~v6;
                const v9 = Math.round(v8);
            } finally {
            }
            return i203;
        }
        const v10 = v1();
    }
}
main();
Probe.reportResults();
