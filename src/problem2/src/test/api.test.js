import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTokenPrices,
  getTokenIconUrl,
  validateTokenIcon,
  getAvailableTokens,
  calculateExchange,
  formatNumber
} from '../api.js';

const mockTokenPrices = [
  { currency: 'USDC', price: '1.0' },
  { currency: 'ETH', price: '2500.50' },
  { currency: 'BTC', price: '45000.75' },
  { currency: 'SWTH', price: '0.0234' },
  { currency: 'INVALID', price: null },
  { currency: 'ZERO', price: '0' },
];

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTokenPrices', () => {
    it('should fetch and parse token prices successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTokenPrices,
      });

      const result = await fetchTokenPrices();

      expect(fetch).toHaveBeenCalledWith('https://interview.switcheo.com/prices.json');
      expect(result).toEqual({
        USDC: 1.0,
        ETH: 2500.50,
        BTC: 45000.75,
        SWTH: 0.0234,
      });
    });

    it('should handle HTTP errors', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchTokenPrices()).rejects.toThrow(
        'Failed to fetch token prices. Please try again later.'
      );
    });

    it('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchTokenPrices()).rejects.toThrow(
        'Failed to fetch token prices. Please try again later.'
      );
    });

    it('should filter out tokens with invalid prices', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { currency: 'VALID', price: '100.5' },
          { currency: 'NO_PRICE', price: null },
          { currency: 'EMPTY_PRICE', price: '' },
        ],
      });

      const result = await fetchTokenPrices();

      expect(result).toEqual({
        VALID: 100.5,
      });
    });
  });

  describe('getTokenIconUrl', () => {
    it('should return correct icon URL for uppercase symbol', () => {
      const url = getTokenIconUrl('ETH');
      expect(url).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg');
    });

    it('should convert lowercase symbol to uppercase', () => {
      const url = getTokenIconUrl('eth');
      expect(url).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg');
    });

    it('should handle mixed case symbols', () => {
      const url = getTokenIconUrl('uSdC');
      expect(url).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg');
    });
  });

  describe('validateTokenIcon', () => {
    it('should return true for valid token icons', async () => {
      const result = await validateTokenIcon('ETH');
      expect(result).toBe(true);
    });

    it('should return false for invalid token icons', async () => {
      const result = await validateTokenIcon('INVALID_TOKEN');
      expect(result).toBe(false);
    });

    it('should handle lowercase symbols', async () => {
      const result = await validateTokenIcon('usdc');
      expect(result).toBe(true);
    });
  });

  describe('getAvailableTokens', () => {
    it('should return tokens with price and icon information', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTokenPrices,
      });

      const result = await getAvailableTokens();

      expect(result).toHaveLength(4); // Only tokens with valid prices
      expect(result[0]).toMatchObject({
        symbol: expect.any(String),
        price: expect.any(Number),
        hasIcon: expect.any(Boolean),
        iconUrl: expect.any(String),
      });

      // Should be sorted alphabetically
      const symbols = result.map(token => token.symbol);
      const sortedSymbols = [...symbols].sort();
      expect(symbols).toEqual(sortedSymbols);
    });

    it('should handle API errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('API Error'));

      await expect(getAvailableTokens()).rejects.toThrow();
    });
  });

  describe('calculateExchange', () => {
    it('should calculate exchange correctly', () => {
      const result = calculateExchange(2000, 1, 5); // 5 ETH to USDC
      expect(result).toBe(10000); // 5 * 2000 / 1 = 10000
    });

    it('should handle decimal calculations', () => {
      const result = calculateExchange(2500.50, 1.0, 2);
      expect(result).toBe(5001); // 2 * 2500.50 / 1.0 = 5001
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculateExchange(0, 1, 5)).toBe(0);
      expect(calculateExchange(100, 0, 5)).toBe(0);
      expect(calculateExchange(100, 1, 0)).toBe(0);
      expect(calculateExchange(null, 1, 5)).toBe(0);
      expect(calculateExchange(100, null, 5)).toBe(0);
      expect(calculateExchange(100, 1, null)).toBe(0);
    });

    it('should handle very small numbers', () => {
      const result = calculateExchange(0.0001, 45000, 1000000);
      expect(result).toBeCloseTo(0.002222, 6);
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with default 6 decimals', () => {
      expect(formatNumber(123.456789012)).toBe('123.456789');
      expect(formatNumber(0.000001234)).toBe('0.000001');
    });

    it('should format with custom decimal places', () => {
      expect(formatNumber(123.456, 2)).toBe('123.46');
      expect(formatNumber(123.456, 0)).toBe('123');
      expect(formatNumber(123.456, 4)).toBe('123.4560');
    });

    it('should handle edge cases', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(null)).toBe('0');
      expect(formatNumber(undefined)).toBe('0');
      expect(formatNumber(NaN)).toBe('0');
      expect(formatNumber('')).toBe('0');
    });

    it('should handle very large numbers', () => {
      expect(formatNumber(1234567890.123456)).toBe('1234567890.123456');
    });

    it('should handle very small numbers', () => {
      expect(formatNumber(0.000000123456, 10)).toBe('0.0000001235');
    });

    it('should round correctly', () => {
      expect(formatNumber(1.9999999, 2)).toBe('2.00');
      expect(formatNumber(1.1111111, 2)).toBe('1.11');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete token swap calculation', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTokenPrices,
      });

      const tokens = await getAvailableTokens();
      const ethToken = tokens.find(t => t.symbol === 'ETH');
      const usdcToken = tokens.find(t => t.symbol === 'USDC');

      expect(ethToken).toBeDefined();
      expect(usdcToken).toBeDefined();

      const exchangeAmount = calculateExchange(ethToken.price, usdcToken.price, 1);
      const formattedAmount = formatNumber(exchangeAmount, 2);

      expect(parseFloat(formattedAmount)).toBe(2500.50);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed API responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });

      await expect(fetchTokenPrices()).rejects.toThrow();
    });

    it('should handle non-array API responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ error: 'Invalid response' }),
      });

      await expect(fetchTokenPrices()).rejects.toThrow();
    });
  });
});