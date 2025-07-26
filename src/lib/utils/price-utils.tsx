import React from "react";

type PriceValue = string | number | null | undefined;

interface FormatPriceOptions {
  isRTL?: boolean;
  currencySymbol?: string;
  decimalPlaces?: number;
  showZeroCents?: boolean;
  price_with_currency?: boolean;
}

/**
 * Formats a price with currency symbol and thousand separators
 * @param price - The price value to format (string, number, null, or undefined)
 * @param options - Formatting options
 * @param options.isRTL - Whether to use RTL direction (default: false)
 * @param options.currencySymbol - Custom currency symbol (default: '$')
 * @param options.decimalPlaces - Number of decimal places to show (default: 0)
 * @param options.showZeroCents - Whether to show .00 for whole numbers (default: false)
 * @returns Formatted price string with currency symbol and thousand separators
 * @example
 * formatPrice(1000) // "1,000"
 * formatPrice(-1234.5, { isRTL: true }) // "-1,234.5"
 * formatPrice('$1,234.56', { currencySymbol: '€' }) // "1,234.56€"
 */
export function formatPrice(
  price: PriceValue,
  {
    isRTL = false,
    price_with_currency = false,
    currencySymbol = "$",
    decimalPlaces = 0,
    showZeroCents = false,
  }: FormatPriceOptions = {}
): React.ReactNode {
  // Handle null/undefined/empty string
  if (price === null || price === undefined || price === "") {
    return isRTL ? `${currencySymbol}0` : `0${currencySymbol}`;
  }

  // Convert to string and clean the input
  const numericValue = String(price)
    .trim()
    .replace(/[^\d.-]/g, "") // Remove all non-numeric except minus and decimal point
    .replace(/(?!^-)-/g, "") // Remove all minus signs except the first one
    .replace(/(\..*?)\..*$/, "$1") // Remove extra decimal points
    .replace(/^0+(\d)/, "$1") // Remove leading zeros
    .replace(/^\./, "0.") // Add leading zero before decimal point if missing
    .replace(/^$/, "0"); // Ensure empty string becomes '0'

  // Parse to number
  const numberValue = parseFloat(numericValue) || 0;
  const isNegative = numberValue < 0;
  const absoluteValue = Math.abs(numberValue);

  // Format number with thousand separators and specified decimal places
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: showZeroCents ? decimalPlaces : 0,
    maximumFractionDigits: decimalPlaces,
    useGrouping: true,
  });

  const formattedNumber = formatter.format(absoluteValue);
  const sign = isNegative ? "-" : "";

  // Return as React node with proper RTL/LTR support
  if (price_with_currency) {
    return `${sign}${formattedNumber}${currencySymbol}`;
  }
  return (
    <span dir={isRTL ? "rtl" : "ltr"} className="price-amount">
      {isRTL ? (
        <>
          {sign}
          {currencySymbol}
          {formattedNumber}
        </>
      ) : (
        <>
          {sign}
          {formattedNumber}
          {currencySymbol}
        </>
      )}
    </span>
  );
}
