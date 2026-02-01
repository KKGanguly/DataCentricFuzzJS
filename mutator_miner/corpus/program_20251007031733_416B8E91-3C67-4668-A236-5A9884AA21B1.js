const v8 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
var date = v8;
var options = { weekday: "short", month: "numeric", day: "numeric" };
const t3 = Intl.DateTimeFormat;
const v18 = new t3("fr-FR", options);
console.log(v18.format(date));
