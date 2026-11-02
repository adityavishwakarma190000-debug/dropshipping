/**
 * Indian Rupee (INR) Formatter utility
 * Formats numbers in Indian Lakhs/Thousands numbering system
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates percentage discount
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Calculates savings amount
 */
export function calculateSavings(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return originalPrice - price;
}

