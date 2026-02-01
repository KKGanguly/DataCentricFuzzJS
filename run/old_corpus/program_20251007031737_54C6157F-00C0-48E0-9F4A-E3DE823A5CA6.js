var worker;
var i = 0;
function sleep(a5) {
    const v7 = (a8) => {
        return setTimeout(a8, a5);
    };
    const v11 = new Promise(v7);
    return v11;
}
async function go() {
    while (i < 512) {
        let v17;
        try { v17 = new Worker("./worker.js"); } catch (e) {}
        worker = v17;
        try { worker.postMessage(1); } catch (e) {}
        await sleep(2000);
        i++;
    }
}
go();
