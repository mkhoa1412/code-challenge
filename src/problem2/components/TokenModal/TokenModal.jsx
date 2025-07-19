import React, { useState, useEffect } from 'react'
import { formatPrice } from '../../utils/calculations'
import styles from './TokenModal.module.css'

function TokenModal({ tokens, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTokens, setFilteredTokens] = useState(tokens)

  useEffect(() => {
    const filtered = tokens.filter(token =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTokens(filtered)
  }, [searchTerm, tokens])

  const handleOverlayClick = (e) => {
    if (e.target.className.includes('modalOverlay')) {
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Select a token</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.tokenSearch}
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.tokenList}>
          {filteredTokens.map((token) => (
            <div
              key={token.symbol}
              className={styles.tokenItem}
              onClick={() => onSelect(token)}
            >
              <img
                src={token.icon}
                alt={token.symbol}
                onError={(e) => e.target.style.display = 'none'}
              />
              <div className={styles.tokenInfo}>
                <div className={styles.tokenSymbol}>{token.symbol}</div>
                <div className={styles.tokenName}>{token.name}</div>
              </div>
              <div className={styles.tokenPrice}>
                ${formatPrice(token.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TokenModal