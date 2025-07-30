import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTokenPrices,
  getTokenIconUrl,
  validateTokenIcon,
  getAvailableTokens,
  calculateExchange,
  formatNumber,
  type TokenPrice,
  type PriceMap,
  type Token
} from '../api';

interface MockResponse {
  ok: boolean;
  status?: number;
  json: () => Promise<TokenPrice[]>;
}

const mockTokenPrices: TokenPrice[] = [
  { currency: 'USDC', price: '1.0' },
  { currency: 'ETH', price: '2500.50' },
  { currency: 'BTC', price: '45000.75' },
  { currency: 'SWTH', price: '0.0234' },
  { currency: 'INVALID', price: null as any },
  { currency: 'ZERO', price: '0' },
];

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTokenPrices', () => {
    it('should fetch and parse token prices successfully', async () => {
      const mockResponse: MockResponse = {
        ok: true,
        json: async () => mockTokenPrices,
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result: PriceMap = await fetchTokenPrices();

      expect(fetch).toHaveBeenCalledWith('https://interview.switcheo.com/prices.json');
      expect(result).toEqual({
        USDC: 1.0,
        ETH: 2500.50,
        BTC: 45000.75,
        SWTH: 0.0234,
      });
    });

    it('should handle HTTP errors', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      await expect(fetchTokenPrices()).rejects.toThrow(
        'Failed to fetch token prices. Please try again later.'
      );
    });

    it('should handle network errors', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchTokenPrices()).rejects.toThrow(
        'Failed to fetch token prices. Please try again later.'
      );
    });

    it('should filter out invalid prices', async () => {
      const mockInvalidPrices: TokenPrice[] = [
        { currency: 'VALID', price: '100' },
        { currency: 'NULL_PRICE', price: null as any },
        { currency: 'ZERO_PRICE', price: '0' },
        { currency: 'NEGATIVE', price: '-10' },
        { currency: 'NAN_PRICE', price: 'not-a-number' },
        { currency: 'EMPTY', price: '' },
      ];

      const mockResponse: MockResponse = {
        ok: true,
        json: async () => mockInvalidPrices,
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result: PriceMap = await fetchTokenPrices();

      expect(result).toEqual({
        VALID: 100,
      });
    });
  });

  describe('getTokenIconUrl', () => {
    it('should return correct icon URL for uppercase symbol', () => {
      const result: string = getTokenIconUrl('ETH');
      expect(result).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg');
    });

    it('should convert lowercase symbol to uppercase', () => {
      const result: string = getTokenIconUrl('eth');
      expect(result).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg');
    });

    it('should handle mixed case symbols', () => {
      const result: string = getTokenIconUrl('uSdC');
      expect(result).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg');
    });
  });

  describe('validateTokenIcon', () => {
    it('should return true for valid icons (USDC, ETH, BTC)', async () => {
      const validSymbols: string[] = ['USDC', 'ETH', 'BTC'];

      for (const symbol of validSymbols) {
        const result: boolean = await validateTokenIcon(symbol);
        expect(result).toBe(true);
      }
    });

    it('should return false for invalid icons', async () => {
      const invalidSymbols: string[] = ['INVALID', 'NONEXISTENT', 'FAKE'];

      for (const symbol of invalidSymbols) {
        const result: boolean = await validateTokenIcon(symbol);
        expect(result).toBe(false);
      }
    });

    it('should handle lowercase symbols', async () => {
      const result: boolean = await validateTokenIcon('usdc');
      expect(result).toBe(true);
    });
  });

  describe('getAvailableTokens', () => {
    it('should return only tokens with valid icons', async () => {
      const mockResponse: MockResponse = {
        ok: true,
        json: async () => [
          { currency: 'USDC', price: '1.0' },
          { currency: 'ETH', price: '2500' },
          { currency: 'INVALID', price: '100' }, // This will be filtered out since it has no icon
        ],
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result: Token[] = await getAvailableTokens();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        symbol: 'ETH',
        price: 2500,
        hasIcon: true,
        iconUrl: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg'
      });
      expect(result[1]).toMatchObject({
        symbol: 'USDC',
        price: 1,
        hasIcon: true,
        iconUrl: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg'
      });
    });

    it('should filter out all tokens without icons', async () => {
      const mockResponse: MockResponse = {
        ok: true,
        json: async () => [
          { currency: 'INVALID', price: '100' },
          { currency: 'NONEXISTENT', price: '200' },
          { currency: 'FAKE', price: '300' },
        ],
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result: Token[] = await getAvailableTokens();

      // All tokens should be filtered out since none have valid icons
      expect(result).toHaveLength(0);
    });

    it('should sort tokens alphabetically (only tokens with icons)', async () => {
      const mockResponse: MockResponse = {
        ok: true,
        json: async () => [
          { currency: 'ETH', price: '2500' },
          { currency: 'BTC', price: '45000' },
          { currency: 'USDC', price: '1.0' },
          { currency: 'INVALID', price: '100' }, // This will be filtered out
        ],
      };

      (globalThis.fetch as any).mockResolvedValueOnce(mockResponse);

      const result: Token[] = await getAvailableTokens();

      // Should return only BTC, ETH, USDC (alphabetically sorted, INVALID filtered out)
      expect(result).toHaveLength(3);
      expect(result.map(t => t.symbol)).toEqual(['BTC', 'ETH', 'USDC']);
    });

    it('should handle API errors', async () => {
      (globalThis.fetch as any).mockRejectedValueOnce(new Error('API Error'));

      await expect(getAvailableTokens()).rejects.toThrow('Failed to fetch token prices. Please try again later.');
    });
  });

  describe('calculateExchange', () => {
    it('should calculate exchange correctly', () => {
      const result: number = calculateExchange(100, 50, 10);
      expect(result).toBe(20);
    });

    it('should handle decimal calculations', () => {
      const result: number = calculateExchange(2500.50, 1.0, 1);
      expect(result).toBe(2500.50);
    });

    it('should return 0 for invalid inputs', () => {
      expect(calculateExchange(0, 50, 10)).toBe(0);
      expect(calculateExchange(100, 0, 10)).toBe(0);
      expect(calculateExchange(100, 50, 0)).toBe(0);
      expect(calculateExchange(null as any, 50, 10)).toBe(0);
      expect(calculateExchange(100, null as any, 10)).toBe(0);
      expect(calculateExchange(100, 50, null as any)).toBe(0);
    });

    it('should handle very small numbers', () => {
      const result: number = calculateExchange(0.0001, 0.0002, 1000);
      expect(result).toBe(500);
    });

    it('should handle very large numbers', () => {
      const result: number = calculateExchange(1000000, 1, 1);
      expect(result).toBe(1000000);
    });
  });

  describe('formatNumber', () => {
    it('should format number with default 6 decimals', () => {
      const result: string = formatNumber(123.456789012);
      expect(result).toBe('123.456789');
    });

    it('should format number with custom decimals', () => {
      const result: string = formatNumber(123.456789, 2);
      expect(result).toBe('123.46');
    });

    it('should handle string input', () => {
      const result: string = formatNumber('123.456', 2);
      expect(result).toBe('123.46');
    });

    it('should return "0" for invalid inputs', () => {
      expect(formatNumber(null as any)).toBe('0');
      expect(formatNumber(undefined as any)).toBe('0');
      expect(formatNumber('invalid' as any)).toBe('0');
      expect(formatNumber(0)).toBe('0.000000');
    });

    it('should handle zero with custom decimals', () => {
      const result: string = formatNumber(0, 2);
      expect(result).toBe('0.00');
    });

    it('should handle negative numbers', () => {
      const result: string = formatNumber(-123.456, 2);
      expect(result).toBe('-123.46');
    });

    it('should handle very small numbers', () => {
      const result: string = formatNumber(0.0000123456, 8);
      expect(result).toBe('0.00001235');
    });

    it('should handle very large numbers', () => {
      const result: string = formatNumber(123456789.123456, 2);
      expect(result).toBe('123456789.12');
    });
  });
});