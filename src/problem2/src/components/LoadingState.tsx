import React from 'react'

interface LoadingStateProps {
  message?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="glass-panel p-8">
      <div className="loading-panel">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default LoadingState