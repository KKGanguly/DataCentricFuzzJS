const v3 = [910985];
let v14;
try { v14 = new Benchmark("RegExp", true, false, 50, RegExpRun, RegExpSetup, null, null, 16); } catch (e) {}
const v15 = [v14];
let v16;
try { v16 = new BenchmarkSuite("RegExp", v3, v15); } catch (e) {}
var RegExpSuite = v16;
var regExpBenchmark = null;
function RegExpSetup() {
    let v22;
    try { v22 = new RegExpBenchmark(); } catch (e) {}
    regExpBenchmark = v22;
    try { RegExpRun(); } catch (e) {}
}
function RegExpRun() {
    try { regExpBenchmark.run(); } catch (e) {}
}
function RegExpBenchmark() {
    const v27 = () => {
        for (let i29 = 0; i29 < 5; i29++) {
            const v36 = /=/;
            let v37;
            try { v37 = v36.exec("VC=74.125.75.1"); } catch (e) {}
            var res = v37;
        }
    };
    this.run = v27;
}
