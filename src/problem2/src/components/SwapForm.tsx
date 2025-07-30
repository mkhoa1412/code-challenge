import React, { useEffect } from 'react'
import { useTokens } from '../hooks/useTokens'
import { useSwapLogic } from '../hooks/useSwapLogic'
import { useValidation } from '../hooks/useValidation'
import { showSwapSuccessToast } from '../utils/toastHelpers'
import TokenInput from './TokenInput'
import SwapButton from './SwapButton'
import ExchangeRateDisplay from './ExchangeRateDisplay'
import SubmitButton from './SubmitButton'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import ValidationError from './ValidationError'

const SwapForm: React.FC = () => {
  const { tokens, isLoading: isLoadingTokens, error, retryLoading } = useTokens()
  const {
    setErrors,
    clearErrors,
    getFieldErrors,
    setFieldError,
    hasErrors
  } = useValidation()

  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isLoading,
    setFromToken,
    setToToken,
    handleFromAmountChange,
    handleToAmountChange,
    handleSwapTokens,
    handleSwapTransaction,
    getExchangeRate,
    getTokenBySymbol,
    validateAmountField,
  } = useSwapLogic({
    tokens,
    onValidationError: setErrors
  })

  // Set default tokens when tokens are loaded
  useEffect(() => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      setFromToken(tokens[0].symbol)
      setToToken(tokens[1].symbol)
    }
  }, [tokens, fromToken, toToken, setFromToken, setToToken])

  const handleFromAmountBlur = () => {
    const error = validateAmountField(fromAmount)
    setFieldError('fromAmount', error)
  }

  const handleFromAmountChangeWithValidation = (value: string) => {
    handleFromAmountChange(value)
    if (getFieldErrors('fromAmount').length > 0) {
      setFieldError('fromAmount', null)
    }
  }

  const handleFromTokenChangeWithValidation = (tokenSymbol: string) => {
    setFromToken(tokenSymbol)
    setFieldError('tokenPair', null)
    setFieldError('toToken', null)

    if (toToken && tokenSymbol === toToken) {
      const pairError = 'Cannot swap the same token'
      setFieldError('tokenPair', pairError)
    }
  }

  const handleToTokenChangeWithValidation = (tokenSymbol: string) => {
    setToToken(tokenSymbol)
    setFieldError('tokenPair', null)
    setFieldError('toToken', null)

    if (fromToken && tokenSymbol === fromToken) {
      const pairError = 'Cannot swap the same token'
      setFieldError('tokenPair', pairError)
    }
  }

    const handleSubmit = async () => {
    clearErrors()

    if (fromToken && toToken && fromToken === toToken) {
      setFieldError('tokenPair', 'Cannot swap the same token')
      return
    }

    const result = await handleSwapTransaction()

    if (result.success) {
      showSwapSuccessToast(fromAmount, fromToken, toAmount, toToken)
    }
  }

  if (isLoadingTokens) {
    return <LoadingState message="Loading tokens..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryLoading} />
  }

  const isSubmitDisabled = isLoading || !fromAmount || !toAmount || !fromToken || !toToken || hasErrors

  return (
    <div className="glass-panel p-8">
      <div className="space-y-6">
        <TokenInput
          label="From"
          inputId="from-amount"
          amount={fromAmount}
          selectedToken={fromToken}
          tokens={tokens}
          onAmountChange={handleFromAmountChangeWithValidation}
          onTokenChange={handleFromTokenChangeWithValidation}
          getTokenBySymbol={getTokenBySymbol}
          errors={getFieldErrors('fromAmount')}
          onBlur={handleFromAmountBlur}
        />

        <SwapButton onSwap={handleSwapTokens} />

        <TokenInput
          label="To"
          inputId="to-amount"
          amount={toAmount}
          selectedToken={toToken}
          tokens={tokens}
          onAmountChange={handleToAmountChange}
          onTokenChange={handleToTokenChangeWithValidation}
          getTokenBySymbol={getTokenBySymbol}
          errors={getFieldErrors('toAmount')}
        />

        {/* Token Pair Validation Error */}
        <ValidationError errors={[...getFieldErrors('tokenPair'), ...getFieldErrors('toToken')]} />

        <ExchangeRateDisplay
          fromToken={fromToken}
          toToken={toToken}
          exchangeRate={getExchangeRate()}
        />

        {/* General Validation Errors */}
        <ValidationError errors={getFieldErrors('general')} />

        <SubmitButton
          isLoading={isLoading}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Swap Tokens
        </SubmitButton>
      </div>
    </div>
  )
}

export default SwapForm