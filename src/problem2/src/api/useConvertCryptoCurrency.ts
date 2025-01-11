import React from "react";

export const useConvertCryptoCurrency = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const convertCryptoCurrency = async (data: {
    amount: number;
    fromCurrency: string;
    toCurrency: string;
  }) => {
    const { amount, fromCurrency, toCurrency } = data;

    setLoading(true);
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          console.log("Data sent", { amount, fromCurrency, toCurrency });
          resolve(data);
        }, 2000),
      );
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  return { loading, error, convertCryptoCurrency };
};
