import { useState, useCallback } from 'react'
import { Token, calculateExchange, formatNumber } from '../api'
import { validateSwapForm, validateAmount, validateTokenSelection, validateTokenPair, SwapFormData } from '../utils/validation'

interface UseSwapLogicProps {
  tokens: Token[]
  onValidationError?: (errors: any[]) => void
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
  handleSwapTransaction: () => Promise<{ success: boolean; errors?: any[] }>
  getExchangeRate: () => string
  getTokenBySymbol: (symbol: string) => Token | undefined
  validateForm: () => { isValid: boolean; errors: any[] }
  validateAmountField: (amount: string) => string | null
  validateFromToken: () => string | null
  validateToToken: () => string | null
  validateTokenPairSelection: () => string | null
}

export const useSwapLogic = ({ tokens, onValidationError }: UseSwapLogicProps): UseSwapLogicReturn => {
  const [fromToken, setFromToken] = useState<string>('')
  const [toToken, setToToken] = useState<string>('')
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  // Validation methods
  const validateAmountField = useCallback((amount: string): string | null => {
    return validateAmount(amount)
  }, [])

  const validateFromToken = useCallback((): string | null => {
    return validateTokenSelection(fromToken, 'from')
  }, [fromToken])

  const validateToToken = useCallback((): string | null => {
    return validateTokenSelection(toToken, 'to')
  }, [toToken])

  const validateTokenPairSelection = useCallback((): string | null => {
    return validateTokenPair(fromToken, toToken)
  }, [fromToken, toToken])

  const validateForm = useCallback(() => {
    const formData: SwapFormData = {
      fromToken,
      toToken,
      fromAmount,
      toAmount
    }

    return validateSwapForm(formData)
  }, [fromToken, toToken, fromAmount, toAmount])

  const handleSwapTransaction = useCallback(async (): Promise<{ success: boolean; errors?: any[] }> => {
    const validation = validateForm()

    if (!validation.isValid) {
      if (onValidationError) {
        onValidationError(validation.errors)
      }
      return { success: false, errors: validation.errors }
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reset form on success
      setFromAmount('')
      setToAmount('')

      return { success: true }
    } catch (error) {
      return {
        success: false,
        errors: [{ field: 'general', message: 'Transaction failed. Please try again.' }]
      }
    } finally {
      setIsLoading(false)
    }
  }, [validateForm, onValidationError, fromAmount, fromToken, toAmount, toToken])

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
    getTokenBySymbol,
    validateForm,
    validateAmountField,
    validateFromToken,
    validateToToken,
    validateTokenPairSelection
  }
}