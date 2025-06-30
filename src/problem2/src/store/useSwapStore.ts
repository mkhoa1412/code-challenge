// src/store/useSwapStore.ts
import { create } from "zustand";

interface SwapState {
  fromToken: string;
  toToken: string;
  amount: number;
  setFromToken: (token: string) => void;
  setToToken: (token: string) => void;
  setAmount: (amt: number) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  fromToken: "",
  toToken: "",
  amount: 0,
  setFromToken: (token) => set({ fromToken: token }),
  setToToken: (token) => set({ toToken: token }),
  setAmount: (amt) => set({ amount: amt }),
}));
