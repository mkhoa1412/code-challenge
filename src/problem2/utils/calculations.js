export function calculateExchangeRate(fromToken, toToken, amount) {
  if (!fromToken || !toToken || !amount) {
    return { exchangeRate: 0, toAmount: 0 }
  }

  const exchangeRate = fromToken.price / toToken.price
  const toAmount = amount * exchangeRate

  return {
    exchangeRate,
    toAmount
  }
}

export function formatPrice(price) {
  if (price >= 1) {
    return price.toFixed(4)
  } else if (price >= 0.01) {
    return price.toFixed(6)
  } else {
    return price.toFixed(8)
  }
}