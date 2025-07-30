import { useState, useEffect } from 'react'
import { Token, getAvailableTokens } from '../api'

interface UseTokensReturn {
  tokens: Token[]
  isLoading: boolean
  error: string
  retryLoading: () => void
}

export const useTokens = (): UseTokensReturn => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const loadTokens = async () => {
    try {
      setIsLoading(true)
      setError('')
      const availableTokens = await getAvailableTokens()
      setTokens(availableTokens)
    } catch (err) {
      setError('Failed to load tokens. Please refresh the page.')
      console.error('Error loading tokens:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTokens()
  }, [])

  const retryLoading = () => {
    loadTokens()
  }

  return {
    tokens,
    isLoading,
    error,
    retryLoading
  }
}