import { useState } from "react";
import { useConvertCryptoCurrency } from "@/api/useConvertCryptoCurrency";
import { useCryptoCurrencies } from "@/api/useCryptoCurrencies";
import { Card } from "@/components/ui/card";
import { ConvertSuccess } from "@/components/Converter/ConvertSuccess";
import { ConvertForm } from "@/components/Converter/ConvertForm";

export const Converter = () => {
  const [completed, setIsCompleted] = useState(false);

  const {
    currencies,
    loading: loadingCurrencies,
    error: errorCurrencies,
  } = useCryptoCurrencies();

  const {
    convertCryptoCurrency,
    loading: loadingConvert,
    error: errorConvert,
  } = useConvertCryptoCurrency();

  if (errorCurrencies || errorConvert) {
    return (
      <div className="text-sm text-red-500">Failed to fetch currencies</div>
    );
  }

  return (
    <>
      <Card className="w-full max-w-4xl space-y-6 rounded-lg bg-white px-6 py-10 shadow-lg">
        {completed ? (
          <ConvertSuccess />
        ) : (
          <ConvertForm
            currenciesData={{
              currencies,
              loadingCurrencies,
            }}
            convertData={{
              convertCryptoCurrency,
              loadingConvert,
            }}
            setIsCompleted={setIsCompleted}
          />
        )}
      </Card>
    </>
  );
};
