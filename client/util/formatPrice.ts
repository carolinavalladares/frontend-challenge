export default function formatPrice(price_in_cents: number) {
  return (price_in_cents / 100).toFixed(2);
}
