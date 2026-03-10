export function convertToNaira(amountinKobo) {
  const amountNaira = (amountinKobo / 100).toFixed(2);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amountNaira);
}
