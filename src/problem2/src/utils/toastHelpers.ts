import toast from 'react-hot-toast'

export const showSuccessToast = (message: string) => {
  return toast.success(message, {
    duration: 4000,
    style: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981',
    },
  })
}

export const showErrorToast = (message: string) => {
  return toast.error(message, {
    duration: 5000,
    style: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444',
    },
  })
}

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    style: {
      background: 'linear-gradient(135deg, #646cff 0%, #535bf2 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(100, 108, 255, 0.3)',
    },
  })
}

// Swap-specific toast messages
export const showSwapSuccessToast = (fromAmount: string, fromToken: string, toAmount: string, toToken: string) => {
  return showSuccessToast(`Successfully swapped ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`)
}

export const showSwapErrorToast = (error?: string) => {
  return showErrorToast(error || 'Swap transaction failed. Please try again.')
}

export const showSwapLoadingToast = () => {
  return showLoadingToast('Processing your swap transaction...')
}