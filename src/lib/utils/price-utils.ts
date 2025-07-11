/**
 * Formats a price string by adding a dollar sign at the end
 * @param price - The price value (string or number)
 * @returns Formatted price string with $ at the end (e.g., "115.00" -> "115$")
 */
export function formatPrice(price: string | number): string {
  if (price === null || price === undefined) return '0$';
  
  // Convert to string and remove any non-numeric characters except decimal point
  const numericString = String(price).replace(/[^\d.]/g, '');
  
  // Parse to number to handle any extra decimal points
  const numberValue = parseFloat(numericString) || 0;
  
  // Format to remove trailing .00 if it's a whole number
  const formattedNumber = Number.isInteger(numberValue)
    ? numberValue.toString()
    : numberValue.toFixed(2).replace(/\.?0+$/, '');
  
  return `${formattedNumber}$`;
}
