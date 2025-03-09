import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import CustomSelect, { Option } from "./components/custom/CustomSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import CurrencyOption from "./components/custom/CurrentOption";

export type Currency = {
  id: string;
  currency: string;
  date: string;
  price: string;
};

type CurrencyFormType = {
  receiveCurrency: string | null;
  sendCurrency: string | null;
  amountToSend: number | null;
  amountToreceive: number | null;
};

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const currencyForm = useForm<CurrencyFormType>({
    defaultValues: {
      receiveCurrency: null,
      sendCurrency: null,
      amountToSend: 0,
      amountToreceive: 0,
    },
  });
  const { watch } = currencyForm;

  const findCurrencyById = useCallback(
    (id: string) => {
      console.log({ id, currencies });
      return currencies.find((c) => c.id === id);
    },
    [currencies]
  );

  const fetchCurrencies = useCallback(async () => {
    try {
      const res = await fetch("https://interview.switcheo.com/prices.json", {
        method: "GET",
      });
      const data = (await res.json()) || [];
      const currencies = data.map(
        (it: Currency) => ({ ...it, id: Math.random().toString() } as Currency)
      );
      setCurrencies(currencies);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const handleSwap = useCallback(() => {
    const { sendCurrency, receiveCurrency } = currencyForm.getValues();
    if (sendCurrency && receiveCurrency) {
      currencyForm.setValue("sendCurrency", receiveCurrency);
      currencyForm.setValue("receiveCurrency", sendCurrency);
    }
  }, [currencyForm]);

  const currencyOptions = useMemo(() => {
    return currencies.map(
      (currency: Currency) =>
        ({
          label: <CurrencyOption currency={currency} />,
          value: currency.id,
        } as Option)
    );
  }, [currencies]);

  useEffect(() => {
    const { unsubscribe } = watch((data, { name }) => {
      const { sendCurrency, amountToSend, receiveCurrency } = data;
      if (
        name === "sendCurrency" ||
        name === "amountToSend" ||
        name === "receiveCurrency"
      ) {
        if (sendCurrency && amountToSend && receiveCurrency) {
          const sendCurrencyData = findCurrencyById(sendCurrency);
          const receiveCurrencyData = findCurrencyById(receiveCurrency);

          if (sendCurrencyData && receiveCurrencyData) {
            const amountToreceive =
              (Number(sendCurrencyData.price) /
                Number(receiveCurrencyData.price)) *
              amountToSend;
            currencyForm.setValue("amountToreceive", amountToreceive);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [watch, findCurrencyById, currencyForm]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Currency Swap</CardTitle>
        <CardDescription>
          Please select the currencies and swap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="email">Amount to send</Label>
          <div className="flex items-center gap-2 space-y-1.5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Controller
                control={currencyForm.control}
                name="amountToSend"
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="Enter amount..."
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Controller
              control={currencyForm.control}
              name="sendCurrency"
              render={({ field }) => (
                <CustomSelect
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                />
              )}
            />
          </div>

          <Label htmlFor="email">Amount to receive</Label>
          <div className="flex items-center gap-2 space-y-1.5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Controller
                control={currencyForm.control}
                name="amountToreceive"
                render={({ field }) => (
                  <Input
                    type="number"
                    disabled
                    placeholder="Received amount"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Controller
              control={currencyForm.control}
              name="receiveCurrency"
              render={({ field }) => (
                <CustomSelect
                  options={currencyOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select currency"
                />
              )}
            />
          </div>

          <Button onClick={handleSwap} className="cursor-pointer mt-2">
            Confirm Swap
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
