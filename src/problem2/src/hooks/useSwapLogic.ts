import { useState, useCallback } from 'react'
import { Token, calculateExchange, formatNumber } from '../api'

interface UseSwapLogicProps {
  tokens: Token[]
}

interface UseSwapLogicReturn {
  fromToken: string
  toToken: string
  fromAmount: string
  toAmount: string
  isLoading: boolean
  setFromToken: (token: string) => void
  setToToken: (token: string) => void
  handleFromAmountChange: (value: string) => void
  handleToAmountChange: (value: string) => void
  handleSwapTokens: () => void
  handleSwapTransaction: () => Promise<void>
  getExchangeRate: () => string
  getTokenBySymbol: (symbol: string) => Token | undefined
}

export const useSwapLogic = ({ tokens }: UseSwapLogicProps): UseSwapLogicReturn => {
  const [fromToken, setFromToken] = useState<string>('')
  const [toToken, setToToken] = useState<string>('')
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Set default tokens when tokens are loaded
  useState(() => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      setFromToken(tokens[0].symbol)
      setToToken(tokens[1].symbol)
    }
  })

  const getTokenBySymbol = useCallback((symbol: string): Token | undefined => {
    return tokens.find(token => token.symbol === symbol)
  }, [tokens])

  const calculateTokenExchange = useCallback((amount: string, from: string, to: string): string => {
    if (!amount || isNaN(Number(amount)) || !from || !to) return ''

    if (from === to) return amount

    const fromTokenData = getTokenBySymbol(from)
    const toTokenData = getTokenBySymbol(to)

    if (!fromTokenData || !toTokenData) return ''

    const result = calculateExchange(fromTokenData.price, toTokenData.price, Number(amount))
    return formatNumber(result, 6)
  }, [getTokenBySymbol])

  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value)
    const converted = calculateTokenExchange(value, fromToken, toToken)
    setToAmount(converted)
  }, [fromToken, toToken, calculateTokenExchange])

  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value)
    const converted = calculateTokenExchange(value, toToken, fromToken)
    setFromAmount(converted)
  }, [fromToken, toToken, calculateTokenExchange])

  const handleSwapTokens = useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }, [fromToken, toToken, fromAmount, toAmount])

  const handleFromTokenChange = useCallback((tokenSymbol: string) => {
    setFromToken(tokenSymbol)
    if (fromAmount) {
      const converted = calculateTokenExchange(fromAmount, tokenSymbol, toToken)
      setToAmount(converted)
    }
  }, [fromAmount, toToken, calculateTokenExchange])

  const handleToTokenChange = useCallback((tokenSymbol: string) => {
    setToToken(tokenSymbol)
    if (fromAmount) {
      const converted = calculateTokenExchange(fromAmount, fromToken, tokenSymbol)
      setToAmount(converted)
    }
  }, [fromAmount, fromToken, calculateTokenExchange])

  const handleSwapTransaction = useCallback(async () => {
    if (!fromAmount || !toAmount) {
      alert('Please enter an amount to swap')
      return
    }

    if (!fromToken || !toToken) {
      alert('Please select both tokens')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert(`Successfully swapped ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`)
      setFromAmount('')
      setToAmount('')
      setIsLoading(false)
    }, 1500)
  }, [fromAmount, toAmount, fromToken, toToken])

  const getExchangeRate = useCallback(() => {
    if (!fromToken || !toToken || fromToken === toToken) return '1.00'

    const fromTokenData = getTokenBySymbol(fromToken)
    const toTokenData = getTokenBySymbol(toToken)

    if (!fromTokenData || !toTokenData) return '0.00'

    const rate = calculateExchange(fromTokenData.price, toTokenData.price, 1)
    return formatNumber(rate, 6)
  }, [fromToken, toToken, getTokenBySymbol])

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isLoading,
    setFromToken: handleFromTokenChange,
    setToToken: handleToTokenChange,
    handleFromAmountChange,
    handleToAmountChange,
    handleSwapTokens,
    handleSwapTransaction,
    getExchangeRate,
    getTokenBySymbol
  }
}