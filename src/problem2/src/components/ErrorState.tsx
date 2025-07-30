import React from 'react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="glass-panel p-8">
      <div className="error-panel">
        <div className="text-red-400 text-6xl mb-4">⚠️</div>
        <p className="text-lg mb-4">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-danger">
            Retry
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorState