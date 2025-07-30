import React, { useState } from 'react'
import { Token, formatNumber } from '../api'
import CustomSelect from './CustomSelect'

interface TokenInputProps {
  label: string
  inputId: string
  amount: string
  selectedToken: string
  tokens: Token[]
  onAmountChange: (value: string) => void
  onTokenChange: (tokenSymbol: string) => void
  getTokenBySymbol: (symbol: string) => Token | undefined
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  inputId,
  amount,
  selectedToken,
  tokens,
  onAmountChange,
  onTokenChange,
  getTokenBySymbol
}) => {
  const [failedTokenInfoIcons, setFailedTokenInfoIcons] = useState<Set<string>>(new Set())

  const handleTokenInfoImageError = (tokenSymbol: string) => {
    setFailedTokenInfoIcons(prev => new Set(prev).add(tokenSymbol))
  }

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-4 flex-col md:flex-row">
        <input
          id={inputId}
          type="number"
          placeholder="0.000000"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="input-field flex-1"
          step="any"
        />
        <CustomSelect
          tokens={tokens}
          selectedToken={selectedToken}
          onTokenChange={onTokenChange}
          placeholder="Select token"
        />
      </div>
      {selectedToken && (
        <div className="token-info justify-center md:justify-start">
          {!failedTokenInfoIcons.has(selectedToken) && (
            <img
              key={selectedToken}
              src={getTokenBySymbol(selectedToken)?.iconUrl}
              alt={selectedToken}
              className="token-icon"
              onError={() => handleTokenInfoImageError(selectedToken)}
            />
          )}
          <span className="font-medium">
            ${formatNumber(getTokenBySymbol(selectedToken)?.price || 0, 4)}
          </span>
        </div>
      )}
    </div>
  )
}

export default TokenInput