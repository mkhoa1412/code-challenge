import { useEffect, useState } from "react";

import type { CurrencyItem } from "@/model";

const FETCH_URL = "https://interview.switcheo.com/prices.json";

export default function useGetCurrencyData() {
  const [data, setData] = useState<CurrencyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(FETCH_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((rawData) => {
        setIsLoading(false);

        if (!Array.isArray(rawData)) {
          throw Error("Invalid data!");
        }

        const currencies: CurrencyItem[] = [];

        for (const currencyItem of rawData) {
          if (
            currencies.find(
              (currency) => currency.currency === currencyItem.currency
            )
          ) {
            continue;
          }

          currencies.push({
            currency: currencyItem.currency,
            price: currencyItem.price,
          });
        }

        setData(currencies);
      });
  }, []);

  return {
    data,
    isLoading,
  };
}
