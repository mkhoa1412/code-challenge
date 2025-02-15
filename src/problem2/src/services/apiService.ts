export const PRICE_API = "https://interview.switcheo.com/prices.json";

export interface Currency {
  currency: string;
  price: number;
}

export const fetchCurrencyPrices = async (): Promise<Currency[]> => {
  try {
    const response = await fetch(PRICE_API);
    const data: Currency[] = await response.json();

    // Remove duplicate currencies
    const uniqueCurrencies: Currency[] = [];
    const seen = new Set<string>();

    data.forEach((item) => {
      if (!seen.has(item.currency)) {
        seen.add(item.currency);
        uniqueCurrencies.push(item);
      }
    });

    return uniqueCurrencies;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return [];
  }
};
