global.fetch = vi.fn();

global.Image = class {
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