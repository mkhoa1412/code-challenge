import React from 'react'
import styles from './LoadingSpinner.module.css'

function LoadingSpinner({ 
  text = 'Loading...', 
  size = 'normal', 
  inline = false 
}) {
  const containerClass = `${styles.loadingContainer} ${
    size === 'small' ? styles.small : ''
  } ${inline ? styles.inline : ''}`

  return (
    <div className={containerClass}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  )
}

export default LoadingSpinner