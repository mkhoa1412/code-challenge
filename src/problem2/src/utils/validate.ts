export const formatDecimalWithCommas = (value: string) => {
  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = value.toString().replace(/,/g, '').split('.');

  // Format the integer part with commas
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return the formatted result with decimals if present
  return typeof decimalPart === 'undefined' ? formattedInteger : `${formattedInteger}.${decimalPart}`;
};
