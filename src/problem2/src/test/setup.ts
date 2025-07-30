import { vi, beforeEach } from 'vitest';

// Mock fetch globally
(globalThis as any).fetch = vi.fn();

// Mock Image class globally
(globalThis as any).Image = class {
  src: string = '';
  onload?: () => void;
  onerror?: () => void;

  constructor() {
    setTimeout(() => {
      if (this.src.includes('USDC') || this.src.includes('ETH') || this.src.includes('BTC')) {
        this.onload?.();
      } else {
        this.onerror?.();
      }
    }, 0);
  }
};

beforeEach(() => {
  vi.clearAllMocks();
});