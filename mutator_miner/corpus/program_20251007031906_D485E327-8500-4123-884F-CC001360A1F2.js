var i = 0;
const v3 = Intl.DateTimeFormat;
const v10 = {
    get hour() {
        if (i == 0) {
            i = 1;
            return "numeric";
        }
    },
};
new v3(undefined, v10);
