/**
 * Formats a price string with currency symbol and thousand separators
 * @param price - The price value (string or number)
 * @param isRTL - Whether to use RTL direction (default: false)
 * @returns Formatted price string with currency symbol and thousand separators (e.g., "10000" -> "10,000$" or RTL: "$10,000")
 */
export function formatPrice(price: string | number, isRTL: boolean = false): string {
  if (price === null || price === undefined) return isRTL ? '$0' : '0$';
  
  // Convert to string and remove any non-numeric characters except decimal point
  const numericString = String(price).replace(/[^\d.]/g, '');
  
  // Parse to number to handle any extra decimal points
  const numberValue = parseFloat(numericString) || 0;
  
  // Format number with thousand separators and handle decimal places
  const formattedNumber = numberValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).replace(/\.00$/, '');
  
  return isRTL ? `$${formattedNumber}` : `${formattedNumber}$`;
}
