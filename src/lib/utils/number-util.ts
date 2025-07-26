/**
 * Formats a number with thousand separators and proper decimal handling
 * @param number - The number value (string or number)
 * @returns Formatted number string with thousand separators (e.g., 10000.50 -> "10,000.5")
 */
export function formatNumber(number: string | number): string {
  if (number === null || number === undefined) return '0';
  
  // Convert to string and remove any non-numeric characters except decimal point
  const numericString = String(number).replace(/[^\d.]/g, '');
  
  // Parse to number to handle any extra decimal points
  const numberValue = parseFloat(numericString) || 0;
  
  // Format number with thousand separators and handle decimal places
  return numberValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).replace(/\.00$/, ''); // Remove .00 if it exists
}
  