const v2 = Intl.NumberFormat;
const v9 = {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "code",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
};
const v10 = new v2("en-GB", v9);
v10.format(0.001);
