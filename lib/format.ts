// Currency + formatting helpers. Prices are stored in paise (integer)
// and formatted to Indian Rupees for display.

export function formatPrice(pricePaise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pricePaise / 100);
}
