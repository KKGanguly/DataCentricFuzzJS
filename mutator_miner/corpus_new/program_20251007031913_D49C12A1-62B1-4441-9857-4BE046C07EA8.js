function f0(a1, a2, a3) {
    'use strict';
    function Locale(a5, a6, a7, a8) {
        this.language = "en";
        this.region = "US";
        this.script = undefined;
        this._genSpec();
    }
    var Locale = Locale;
    function _genSpec() {
        this.spec = this.language || "";
        if (this.script) {
            if (this.spec.length > 0) {
                this.spec += "-";
            }
            this.spec += this.script;
        }
        if (this.region) {
            if (this.spec.length > 0) {
                this.spec += "-";
            }
            this.spec += this.region;
        }
    }
    Locale.prototype = { _genSpec: _genSpec };
    a1.exports = Locale;
}
function f49(a50, a51, a52) {
    'use strict';
    var Locale = a52(0);
    function CaseMapper(a57) {
        this.up = a57;
        const v59 = new Locale();
        this.locale = v59;
    }
    var CaseMapper = CaseMapper;
    function map(a63) {
        return a63;
    }
    CaseMapper.prototype = { map: map };
    a50.exports = CaseMapper;
}
function f65(a66, a67, a68) {
    'use strict';
    a67.initCaseMappers = undefined;
    a67.toLowerCase = undefined;
    a67.toUpperCase = undefined;
    var CaseMapper = a68(1);
    var toLowerCaseMapper;
    var toUpperCaseMapper;
    function f77() {
        const v79 = new CaseMapper(false);
        toLowerCaseMapper = v79;
        const v81 = new CaseMapper(true);
        toUpperCaseMapper = v81;
    }
    a67.initCaseMappers = f77;
    function f82(a83) {
        return a83;
    }
    a67.toLowerCase = f82;
    function f84(a85) {
        return a85;
    }
    a67.toUpperCase = f84;
}
const v86 = [f0,f49,f65];
function f87(a88) {
    var installedModules = {};
    function __webpack_require__(a92) {
        if (installedModules[a92]) {
            return installedModules[a92].exports;
        }
        const v96 = {};
        const v98 = { exports: v96, id: a92, loaded: false };
        installedModules[a92] = v98;
        var module = v98;
        const v100 = module.exports;
        const v101 = module.exports;
        a88[a92].call(v100, module, v101, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    return __webpack_require__(2);
}
var CaseMappers = f87(v86);
function test() {
    CaseMappers.initCaseMappers();
}
test();
