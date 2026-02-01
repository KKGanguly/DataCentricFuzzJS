const v2 = Intl.NumberFormat;
const v8 = {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
};
const v9 = v8;
const v11 = new v2("en-GB", v9);
const v10 = v11;
v10.format(0.001);
