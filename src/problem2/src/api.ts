const API_BASE_URL = 'https://interview.switcheo.com';
const ICON_BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

// Type definitions
export interface TokenPrice {
  price: string;
  currency: string;
}

export interface PriceMap {
  [currency: string]: number;
}

export interface Token {
  symbol: string;
  price: number;
  hasIcon: boolean;
  iconUrl: string;
}

export async function fetchTokenPrices(): Promise<PriceMap> {
  try {
    const response = await fetch(`${API_BASE_URL}/prices.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const prices: TokenPrice[] = await response.json();

    const priceMap: PriceMap = {};
    prices.forEach(token => {
      if (token.price && token.currency && parseFloat(token.price) > 0 && !isNaN(parseFloat(token.price))) {
        priceMap[token.currency] = parseFloat(token.price);
      }
    });

    return priceMap;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw new Error('Failed to fetch token prices. Please try again later.');
  }
}

export function getTokenIconUrl(symbol: string): string {
  return `${ICON_BASE_URL}/${symbol.toUpperCase()}.svg`;
}

export async function validateTokenIcon(symbol: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getTokenIconUrl(symbol);
  });
}

export async function getAvailableTokens(): Promise<Token[]> {
  try {
    const prices = await fetchTokenPrices();
    const tokens: Token[] = [];

    for (const [symbol, price] of Object.entries(prices)) {
      const hasIcon = await validateTokenIcon(symbol);
      // Only include tokens that have valid icons
      if (hasIcon) {
        tokens.push({
          symbol: symbol.toUpperCase(),
          price,
          hasIcon,
          iconUrl: getTokenIconUrl(symbol)
        });
      }
    }

    return tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
  } catch (error) {
    console.error('Error getting available tokens:', error);
    throw error;
  }
}

export function calculateExchange(fromPrice: number, toPrice: number, amount: number): number {
  if (!fromPrice || !toPrice || !amount) return 0;
  return (amount * fromPrice) / toPrice;
}

export function formatNumber(value: number | string, decimals: number = 6): string {
  if (value === null || value === undefined || isNaN(Number(value))) return '0';
  return parseFloat(String(value)).toFixed(decimals);
}