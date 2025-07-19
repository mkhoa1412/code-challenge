import React from 'react'
import styles from './ExchangeRate.module.css'

function ExchangeRate({ fromToken, toToken, rate }) {
  if (!fromToken || !toToken || !rate) return null

  return (
    <div className={styles.exchangeRate}>
      <span>
        1 {fromToken.symbol} = {rate.toFixed(6)} {toToken.symbol}
      </span>
    </div>
  )
}

export default ExchangeRate