import React, { useState, useEffect, useCallback } from 'react'
import TokenSelector from '../TokenSelector'
import TokenModal from '../TokenModal'
import ExchangeRate from '../ExchangeRate'
import ErrorMessage from '../ErrorMessage'
import LoadingSpinner from '../LoadingSpinner'
import { useTokens } from '../../hooks/useTokens'
import { calculateExchangeRate } from '../../utils/calculations'
import styles from './SwapCard.module.css'

function SwapCard() {
  const { tokens, loading, error } = useTokens()
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTarget, setModalTarget] = useState(null)
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapError, setSwapError] = useState('')

  // Calculate exchange rate and to amount
  const updateToAmount = useCallback((amount) => {
    if (!fromToken || !toToken || !amount || isNaN(amount) || amount <= 0) {
      setToAmount('')
      return
    }

    const result = calculateExchangeRate(fromToken, toToken, parseFloat(amount))
    setToAmount(result.toAmount.toFixed(6))
  }, [fromToken, toToken])

  // Update to amount when from amount changes
  useEffect(() => {
    updateToAmount(fromAmount)
  }, [fromAmount, updateToAmount])

  const handleTokenSelect = (token) => {
    if (modalTarget === 'from') {
      setFromToken(token)
    } else {
      setToToken(token)
    }
    setIsModalOpen(false)
    setModalTarget(null)
  }

  const handleSwapDirection = () => {
    if (!fromToken || !toToken) return

    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleSwap = async (e) => {
    e.preventDefault()
    setIsSwapping(true)
    setSwapError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Success
      alert(`Swap successful!\n${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}`)
      // Reset form
      setFromAmount('')
      setToAmount('')
    } catch (error) {
      setSwapError('Swap failed. Please try again.')
    } finally {
      setIsSwapping(false)
    }
  }

  const isFormValid = fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0

  const getExchangeRate = () => {
    if (!fromToken || !toToken) return null
    return calculateExchangeRate(fromToken, toToken, 1)
  }

  if (loading) {
    return (
      <div className={styles.swapCard}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <LoadingSpinner text="Loading tokens..." />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.swapCard}>
      <h2 className={styles.title}>Swap Tokens</h2>

      <form className={styles.form} onSubmit={handleSwap}>
        {/* From Token Section */}
        <div className={styles.tokenSection}>
          <label className={styles.sectionLabel}>From</label>
          <div className={styles.inputGroup}>
            <TokenSelector
              token={fromToken}
              onClick={() => {
                setModalTarget('from')
                setIsModalOpen(true)
              }}
            />
            <input
              type="number"
              className={styles.amountInput}
              placeholder="0.01 - 100000"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              step="any"
              min="0"
            />
          </div>
          <div className={styles.balance}>Balance: 0.00</div>
        </div>

        {/* Swap Direction Button */}
        <button
          type="button"
          className={styles.swapButton}
          disabled={!fromToken || !toToken}
          onClick={handleSwapDirection}
        >
          <svg className={styles.swapIcon} viewBox="0 0 24 24">
            <path d="M7.5 3h3v18.5l-7-7h4V3zM16.5 21h-3V2.5l7 7h-4V21z"/>
          </svg>
        </button>

        {/* To Token Section */}
        <div className={styles.tokenSection}>
          <label className={styles.sectionLabel}>To</label>
          <div className={styles.inputGroup}>
            <TokenSelector
              token={toToken}
              onClick={() => {
                setModalTarget('to')
                setIsModalOpen(true)
              }}
            />
            <input
              type="number"
              className={styles.amountInput}
              placeholder="0.01 - 100000"
              value={toAmount}
              readOnly
            />
          </div>
          <div className={styles.balance}>Balance: 0.00</div>
        </div>

        {/* Exchange Rate */}
        {fromToken && toToken && (
          <ExchangeRate
            fromToken={fromToken}
            toToken={toToken}
            rate={getExchangeRate()?.exchangeRate}
          />
        )}

        {/* Error Messages */}
        {error && <ErrorMessage message={error} />}
        {swapError && <ErrorMessage message={swapError} />}

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isFormValid || isSwapping}
        >
          <span>
            {isSwapping
              ? 'Processing...'
              : !fromToken || !toToken
                ? 'Select tokens to continue'
                : !fromAmount || parseFloat(fromAmount) <= 0
                  ? 'Enter amount'
                  : 'Confirm Swap'
            }
          </span>
          {isSwapping && <div className={styles.buttonSpinner}></div>}
        </button>
      </form>

      {/* Token Selection Modal */}
      {isModalOpen && (
        <TokenModal
          tokens={tokens}
          onSelect={handleTokenSelect}
          onClose={() => {
            setIsModalOpen(false)
            setModalTarget(null)
          }}
        />
      )}
    </div>
  )
}

export default SwapCard
