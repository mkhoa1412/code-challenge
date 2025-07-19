import { useState, useEffect } from 'react'

const TOKEN_NAMES = {
  'SWTH': 'Switcheo',
  'ETH': 'Ethereum',
  'BTC': 'Bitcoin',
  'USDC': 'USD Coin',
  'USDT': 'Tether',
  'BNB': 'Binance Coin',
  'ADA': 'Cardano',
  'SOL': 'Solana',
  'MATIC': 'Polygon',
  'DOT': 'Polkadot',
  'ATOM': 'Cosmos',
  'AVAX': 'Avalanche',
  'LUNA': 'Terra Luna',
  'FTM': 'Fantom',
  'NEAR': 'NEAR Protocol'
}

export function useTokens() {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://interview.switcheo.com/prices.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch token prices')
        }

        const pricesData = await response.json()
        
        // Process prices into tokens array
        const processedTokens = pricesData
          .filter(item => item.price && parseFloat(item.price) > 0)
          .map(item => ({
            symbol: item.currency,
            name: TOKEN_NAMES[item.currency] || item.currency,
            price: parseFloat(item.price),
            icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`
          }))
          .sort((a, b) => a.symbol.localeCompare(b.symbol))

        setTokens(processedTokens)
        setError('')
      } catch (err) {
        console.error('Failed to load token data:', err)
        setError('Failed to load token data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return { tokens, loading, error }
}