const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
export const money = (n: number) => gbp.format(n);
