// src/utils/currencyUtils.ts
export const formatCurrency = (
  amount: number,
  currencyCode: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

// Add a new function for formatting token amounts (just numbers)
export const formatTokenAmount = (
  amount: number | string,
  decimals: number = 8
): string => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) {
    return ""; // Handle invalid input
  }
  return num.toFixed(decimals); // Format to a fixed number of decimal places
};

export const calculateExchangeAmount = (
  amount: number,
  fromCurrencyPrice: number | undefined,
  toCurrencyPrice: number | undefined
): string => {
  if (
    fromCurrencyPrice === undefined ||
    toCurrencyPrice === undefined ||
    isNaN(amount)
  ) {
    return "";
  }
  const exchangeRate = fromCurrencyPrice / toCurrencyPrice; // Calculate directly
  if (isNaN(exchangeRate)) return ""; //Check for NaN case

  return (amount * exchangeRate).toString();
};
