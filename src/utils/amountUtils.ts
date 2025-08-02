/**
 * Utility functions for safely handling amount values from API responses
 * Prevents React rendering errors when API returns objects instead of numbers
 */

export interface AmountObject {
  amount__sum?: number;
}

export type AmountValue = number | AmountObject | null | undefined;

/**
 * Safely extracts a numeric value from an amount field
 * Handles cases where API returns either a number or an object with amount__sum
 * @param amount - The amount value from API (can be number, object, null, or undefined)
 * @returns A safe numeric value (never an object)
 */
export function getAmountValue(amount: AmountValue): number {
  if (typeof amount === 'number') {
    return amount;
  }
  
  if (typeof amount === 'object' && amount !== null && 'amount__sum' in amount) {
    return amount.amount__sum || 0;
  }
  
  return 0;
}

/**
 * Safely extracts price value, preferring explicit price over amount
 * @param price - The price value (number, null, or undefined)
 * @param amount - The amount value (fallback if price is not available)
 * @returns A safe numeric price value
 */
export function getPriceValue(price: number | null | undefined, amount: AmountValue): number {
  if (typeof price === 'number' && price > 0) {
    return price;
  }
  
  return getAmountValue(amount);
}

/**
 * Safely formats amount for display in JSX
 * @param amount - The amount value from API
 * @param unit - Optional unit to append (e.g., 'шт.', 'кг')
 * @returns Formatted string safe for JSX rendering
 */
export function formatAmount(amount: AmountValue, unit?: string): string {
  const value = getAmountValue(amount);
  return unit ? `${value} ${unit}` : value.toString();
}
