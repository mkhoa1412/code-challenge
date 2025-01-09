import { ICurrency } from "@/types/Currency";

export const getCurrencyPrice = (currencies: ICurrency[], currency: string) => {
  return currencies.find((c) => c.currency === currency)?.price ?? 0;
};
