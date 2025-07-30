import React from 'react'

interface ExchangeRateDisplayProps {
  fromToken: string
  toToken: string
  exchangeRate: string
}

const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  fromToken,
  toToken,
  exchangeRate
}) => {
  return (
    <div className="exchange-rate-panel">
      <p className="text-gray-400 text-sm">
        1 {fromToken} = {exchangeRate} {toToken}
      </p>
    </div>
  )
}

export default ExchangeRateDisplay