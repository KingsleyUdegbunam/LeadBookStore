export function convertToNaira(amountInKobo) {
  const amount = amountInKobo ?? 0;
  const amountNaira = (amount / 100).toFixed(2);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amountNaira);
}
