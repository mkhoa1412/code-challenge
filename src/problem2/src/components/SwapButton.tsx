import React from 'react'

interface SwapButtonProps {
  onSwap: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ onSwap }) => {
  return (
    <div className="flex justify-center my-4">
      <button
        type="button"
        onClick={onSwap}
        className="swap-button"
        title="Swap tokens"
      >
        ⇅
      </button>
    </div>
  )
}

export default SwapButton