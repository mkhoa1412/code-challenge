import { getCurrencyPrice } from "@/helpers/getCurrencyPrice";
import { ICurrency } from "@/types/Currency";

export const convertCurrencyPrice = ({
  currencies,
  amount,
  fromCurrency,
  toCurrency,
}: {
  currencies: ICurrency[];
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}) => {
  const fromPrice = getCurrencyPrice(currencies, fromCurrency);
  const toPrice = getCurrencyPrice(currencies, toCurrency);
  if (!fromPrice || !toPrice) return 0;

  return (amount * fromPrice) / toPrice;
};
