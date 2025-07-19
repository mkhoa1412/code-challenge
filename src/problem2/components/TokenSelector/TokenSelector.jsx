import React from 'react'
import styles from './TokenSelector.module.css'

function TokenSelector({ token, onClick }) {
  return (
    <div className={styles.tokenSelector} onClick={onClick}>
      {token ? (
        <>
          <img
            src={token.icon}
            alt={token.symbol}
            className={styles.tokenIcon}
            onError={(e) => e.target.style.display = 'none'}
          />
          <span>{token.symbol}</span>
        </>
      ) : (
        <span>Select Token</span>
      )}
      <svg className={styles.dropdownArrow} viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </div>
  )
}

export default TokenSelector