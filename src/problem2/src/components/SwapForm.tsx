import React, { useEffect } from 'react'
import { useTokens } from '../hooks/useTokens'
import { useSwapLogic } from '../hooks/useSwapLogic'
import TokenInput from './TokenInput'
import SwapButton from './SwapButton'
import ExchangeRateDisplay from './ExchangeRateDisplay'
import SubmitButton from './SubmitButton'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'

const SwapForm: React.FC = () => {
  const { tokens, isLoading: isLoadingTokens, error, retryLoading } = useTokens()

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
    getTokenBySymbol
  } = useSwapLogic({ tokens })

  // Set default tokens when tokens are loaded
  useEffect(() => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      setFromToken(tokens[0].symbol)
      setToToken(tokens[1].symbol)
    }
  }, [tokens, fromToken, toToken, setFromToken, setToToken])

  if (isLoadingTokens) {
    return <LoadingState message="Loading tokens..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryLoading} />
  }

  const isSubmitDisabled = isLoading || !fromAmount || !toAmount || !fromToken || !toToken

  return (
    <div className="glass-panel p-8">
      <div className="space-y-6">
        <TokenInput
          label="From"
          inputId="from-amount"
          amount={fromAmount}
          selectedToken={fromToken}
          tokens={tokens}
          onAmountChange={handleFromAmountChange}
          onTokenChange={setFromToken}
          getTokenBySymbol={getTokenBySymbol}
        />

        <SwapButton onSwap={handleSwapTokens} />

        <TokenInput
          label="To"
          inputId="to-amount"
          amount={toAmount}
          selectedToken={toToken}
          tokens={tokens}
          onAmountChange={handleToAmountChange}
          onTokenChange={setToToken}
          getTokenBySymbol={getTokenBySymbol}
        />

        <ExchangeRateDisplay
          fromToken={fromToken}
          toToken={toToken}
          exchangeRate={getExchangeRate()}
        />

        <SubmitButton
          isLoading={isLoading}
          disabled={isSubmitDisabled}
          onClick={handleSwapTransaction}
        >
          Swap Tokens
        </SubmitButton>
      </div>
    </div>
  )
}

export default SwapForm