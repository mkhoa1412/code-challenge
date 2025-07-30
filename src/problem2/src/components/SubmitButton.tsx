import React from 'react'

interface SubmitButtonProps {
  isLoading: boolean
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  disabled,
  onClick,
  children
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-primary w-full text-lg py-4"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default SubmitButton