try {
    window.opener = null;
    try { Object.getOwnPropertyNames(window); } catch (e) {}
} catch(e4) {
}
