import React, { useState, useEffect, useRef } from 'react'
import { Token } from '../api'

interface CustomSelectProps {
  tokens: Token[]
  selectedToken: string
  onTokenChange: (tokenSymbol: string) => void
  placeholder?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  tokens,
  selectedToken,
  onTokenChange,
  placeholder = "Select token"
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [failedIcons, setFailedIcons] = useState<Set<string>>(new Set())
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedTokenData = tokens.find(token => token.symbol === selectedToken)

  const handleImageError = (tokenSymbol: string) => {
    setFailedIcons(prev => new Set(prev).add(tokenSymbol))
  }

  const handleTokenSelect = (tokenSymbol: string) => {
    onTokenChange(tokenSymbol)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="select-field w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedTokenData ? (
            <>
              {!failedIcons.has(selectedTokenData.symbol) && (
                <img
                  key={selectedTokenData.symbol}
                  src={selectedTokenData.iconUrl}
                  alt={selectedTokenData.symbol}
                  className="w-5 h-5 rounded-full"
                  onError={() => handleImageError(selectedTokenData.symbol)}
                />
              )}
              <span>{selectedTokenData.symbol}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {tokens.map((token) => (
            <button
              key={token.symbol}
              type="button"
              onClick={() => handleTokenSelect(token.symbol)}
              className={`w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-white/5 transition-colors ${
                selectedToken === token.symbol ? 'bg-white/10' : ''
              }`}
            >
              {!failedIcons.has(token.symbol) && (
                <img
                  src={token.iconUrl}
                  alt={token.symbol}
                  className="w-5 h-5 rounded-full"
                  onError={() => handleImageError(token.symbol)}
                />
              )}
              <span className="text-white">{token.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect