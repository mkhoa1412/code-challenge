import React from 'react'
import styles from './ErrorMessage.module.css'

function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div className={styles.errorMessage}>
      <svg className={styles.errorIcon} viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <p className={styles.errorText}>{message}</p>
      {onDismiss && (
        <button className={styles.dismissBtn} onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
