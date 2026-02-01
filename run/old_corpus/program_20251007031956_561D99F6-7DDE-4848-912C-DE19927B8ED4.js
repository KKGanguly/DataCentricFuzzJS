function start() {
    o23 = document.body;
    const v6 = new MutationObserver(cb_observer_136_1);
    o39 = v6;
    const v9 = top.o23;
    o39.observe(v9, { childList: true, attributes: true, characterDataOldValue: true });
    const t5 = o23.style;
    t5.position = "fixed";
}
function cb_observer_136_1(a20) {
    to = a20.shift();
    gc();
    gc();
    gc();
}
