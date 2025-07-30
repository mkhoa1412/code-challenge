import { describe, it, expect } from 'vitest'
import { calculateExchange, formatNumber } from '../api'

// Test the token exchange calculation logic
describe('Token Swap Logic', () => {
  describe('calculateExchange', () => {
    it('should calculate token exchange correctly', () => {
      // If Token A costs $10 and Token B costs $5,
      // then 1 Token A should get you 2 Token B
      const result = calculateExchange(10, 5, 1)
      expect(result).toBe(2)
    })

    it('should handle different token prices', () => {
      // If Token A costs $100 and Token B costs $25,
      // then 0.5 Token A should get you 2 Token B
      const result = calculateExchange(100, 25, 0.5)
      expect(result).toBe(2)
    })

    it('should return 0 for invalid inputs', () => {
      expect(calculateExchange(0, 5, 1)).toBe(0)
      expect(calculateExchange(10, 0, 1)).toBe(0)
      expect(calculateExchange(10, 5, 0)).toBe(0)
    })

    it('should handle same token exchange', () => {
      const result = calculateExchange(10, 10, 5)
      expect(result).toBe(5)
    })

    it('should handle fractional amounts', () => {
      const result = calculateExchange(1.5, 0.5, 2)
      expect(result).toBe(6)
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with default 6 decimals', () => {
      expect(formatNumber(1.23456789)).toBe('1.234568')
    })

    it('should format numbers with custom decimals', () => {
      expect(formatNumber(1.23456789, 2)).toBe('1.23')
      expect(formatNumber(1.23456789, 4)).toBe('1.2346')
    })

    it('should handle string inputs', () => {
      expect(formatNumber('1.23456789', 2)).toBe('1.23')
    })

    it('should handle invalid inputs', () => {
      expect(formatNumber(null as any)).toBe('0')
      expect(formatNumber(undefined as any)).toBe('0')
      expect(formatNumber('abc')).toBe('0')
    })

    it('should handle zero values', () => {
      expect(formatNumber(0)).toBe('0.000000')
      expect(formatNumber('0', 2)).toBe('0.00')
    })

    it('should handle large numbers', () => {
      expect(formatNumber(1234567.89, 2)).toBe('1234567.89')
    })

    it('should handle very small numbers', () => {
      expect(formatNumber(0.000001, 8)).toBe('0.00000100')
    })
  })

  describe('Token Exchange Scenarios', () => {
    const mockTokenPrices = {
      'ETH': 2000,
      'BTC': 50000,
      'USDC': 1,
      'USDT': 1,
      'DAI': 1
    }

    it('should swap ETH to BTC correctly', () => {
      const ethAmount = 1
      const result = calculateExchange(mockTokenPrices.ETH, mockTokenPrices.BTC, ethAmount)
      expect(result).toBe(0.04) // 1 ETH = 0.04 BTC
    })

    it('should swap BTC to ETH correctly', () => {
      const btcAmount = 0.1
      const result = calculateExchange(mockTokenPrices.BTC, mockTokenPrices.ETH, btcAmount)
      expect(result).toBe(2.5) // 0.1 BTC = 2.5 ETH
    })

    it('should swap ETH to stablecoins correctly', () => {
      const ethAmount = 1
      const result = calculateExchange(mockTokenPrices.ETH, mockTokenPrices.USDC, ethAmount)
      expect(result).toBe(2000) // 1 ETH = 2000 USDC
    })

    it('should handle stablecoin to stablecoin swaps', () => {
      const usdcAmount = 100
      const result = calculateExchange(mockTokenPrices.USDC, mockTokenPrices.USDT, usdcAmount)
      expect(result).toBe(100) // 100 USDC = 100 USDT
    })

    it('should format small token amounts correctly', () => {
      const smallAmount = calculateExchange(mockTokenPrices.ETH, mockTokenPrices.BTC, 0.001)
      expect(formatNumber(smallAmount, 8)).toBe('0.00004000')
    })
  })
})