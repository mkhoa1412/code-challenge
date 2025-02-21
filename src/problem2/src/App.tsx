import { useState } from "react";
import { RefreshCcw } from "lucide-react";

import { CurrencyCbo } from "./components/CurrencyCbo";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Spinner } from "./components/ui/spinner";
import useGetCurrencyData from "./hooks/useGetCurrencyData";
import { NumberInput } from "./components/NumberInput";
import type { CurrencyItem } from "./model";
import logo from "./logo.svg";

export default function App() {
  const { data: currencyList, isLoading } = useGetCurrencyData();

  const [firstCurrency, setFirstCurrency] = useState<CurrencyItem>();
  const [secondCurrency, setSecondCurrency] = useState<CurrencyItem>();

  const [firstValue, setFirstValue] = useState<number>(0);

  let secondValue = 0;
  let elExchangeRate = <></>;

  if (firstCurrency && secondCurrency) {
    const ratio = firstCurrency.price / secondCurrency.price;

    secondValue = firstValue * ratio;

    elExchangeRate = (
      <section className="mt-4 flex flex-col items-center justify-center px-2">
        <p className="text-xs">Exchange Rate</p>
        <p className="text-sm font-medium">
          1 {firstCurrency.currency} = {ratio} {secondCurrency.currency}
        </p>
      </section>
    );
  }

  const handleClickSwap = () => {
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstCurrency);
  };

  return (
    <main className="text-center min-h-screen p-4 flex items-center justify-center bg-[#282c34]">
      <Card className="min-w-[20vw]">
        <header className="p-4 flex flex-col items-center">
          <img
            src={logo}
            className="h-[108px] pointer-events-none animate-[spin_20s_linear_infinite] relative"
            alt="logo"
          />

          <h1 className="text-xl font-bold">Currency Swap Form</h1>
        </header>

        <article className="flex flex-col gap-2 pb-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <section className="px-4 flex items-center gap-1">
                <NumberInput
                  defaultValue={firstValue}
                  onChange={setFirstValue}
                />
                <CurrencyCbo
                  list={currencyList}
                  selectedCurrency={firstCurrency}
                  onChangeCurrency={setFirstCurrency}
                />
              </section>

              <section className="p-2 flex flex-col items-center justify-center gap-2">
                <Button onClick={handleClickSwap}>
                  <RefreshCcw /> Swap
                </Button>
              </section>

              <section className="px-4 flex items-center gap-1">
                <Input value={secondValue} />
                <CurrencyCbo
                  list={currencyList}
                  selectedCurrency={secondCurrency}
                  onChangeCurrency={setSecondCurrency}
                />
              </section>

              {elExchangeRate}
            </>
          )}
        </article>
      </Card>
    </main>
  );
}
