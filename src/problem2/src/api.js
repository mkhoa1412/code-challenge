const API_BASE_URL = 'https://interview.switcheo.com';
const ICON_BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

export async function fetchTokenPrices() {
  try {
    const response = await fetch(`${API_BASE_URL}/prices.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const prices = await response.json();

    const priceMap = {};
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

export function getTokenIconUrl(symbol) {
  return `${ICON_BASE_URL}/${symbol.toUpperCase()}.svg`;
}

export async function validateTokenIcon(symbol) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getTokenIconUrl(symbol);
  });
}

export async function getAvailableTokens() {
  try {
    const prices = await fetchTokenPrices();
    const tokens = [];

    for (const [symbol, price] of Object.entries(prices)) {
      const hasIcon = await validateTokenIcon(symbol);
      tokens.push({
        symbol: symbol.toUpperCase(),
        price,
        hasIcon,
        iconUrl: getTokenIconUrl(symbol)
      });
    }

    return tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
  } catch (error) {
    console.error('Error getting available tokens:', error);
    throw error;
  }
}

export function calculateExchange(fromPrice, toPrice, amount) {
  if (!fromPrice || !toPrice || !amount) return 0;
  return (amount * fromPrice) / toPrice;
}

export function formatNumber(value, decimals = 6) {
  if (!value || isNaN(value)) return '0';
  return parseFloat(value).toFixed(decimals);
}