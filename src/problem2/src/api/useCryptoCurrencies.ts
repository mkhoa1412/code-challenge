import { useEffect, useState } from "react";
import { getUniqueCurrencies } from "@/helpers/getUniqueCurrencies";
import { ICurrency } from "@/types/Currency";

export const useCryptoCurrencies = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json",
        );
        const currenciesList = await response.json();

        const uniqueCurrenciesList = getUniqueCurrencies(currenciesList);
        const sortedCurrenciesList = uniqueCurrenciesList.sort((a, b) =>
          a.currency.localeCompare(b.currency),
        );

        setCurrencies(sortedCurrenciesList);

        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message ?? "Something went wrong");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { currencies, loading, error };
};
