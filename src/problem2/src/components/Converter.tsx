import { useCryptoCurrencies } from "@/api/useCryptoCurrencies";
import { CurrencySelect } from "@/components/CurrencySelect";
import { NumberField } from "@/components/NumberField";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormProps {
  from: string;
  to: string;
  currencyFrom: string;
  currencyTo: string;
}

export const Converter = () => {
  const {
    currencies,
    loading: loadingCurrencies,
    error: errorCurrencies,
  } = useCryptoCurrencies();

  const form = useForm<IFormProps>({
    defaultValues: {
      from: "0",
      to: "0",
      currencyFrom: "ETH",
      currencyTo: "USD",
    },
  });
  const { control, setValue, watch } = form;

  const watchFrom = watch("from");
  const watchTo = watch("to");
  const watchCurrencyFrom = watch("currencyFrom");
  const watchCurrencyTo = watch("currencyTo");

  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const getCurrencyPrice = (currency: string) => {
    return currencies.find((c) => c.currency === currency)?.price ?? 0;
  };

  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ) => {
    const fromPrice = getCurrencyPrice(fromCurrency);
    const toPrice = getCurrencyPrice(toCurrency);
    if (!fromPrice || !toPrice) return 0;

    return (amount * fromPrice) / toPrice;
  };

  //Convert FROM -> TO
  useEffect(() => {
    console.log(watchFrom);
    if (activeField !== "from") return;

    const fromNum = parseFloat(watchFrom);
    if (isNaN(fromNum)) return setValue("to", "0");

    const convertedValue = convertAmount(
      fromNum,
      watchCurrencyFrom,
      watchCurrencyTo,
    );

    setValue("to", convertedValue.toString());
  }, [watchFrom, watchCurrencyFrom, watchCurrencyTo, activeField]);

  //Convert TO -> FROM
  useEffect(() => {
    if (activeField !== "to") return;

    const toNum = parseFloat(watchTo);
    if (isNaN(toNum)) return setValue("from", "0");

    const convertedValue = convertAmount(
      toNum,
      watchCurrencyTo,
      watchCurrencyFrom,
    );

    setValue("from", convertedValue.toString());
  }, [watchTo, watchCurrencyFrom, watchCurrencyTo, activeField]);

  return errorCurrencies ? (
    <div className="text-sm text-red-500">Failed to fetch currencies</div>
  ) : (
    <Form {...form}>
      <form className="flex items-center gap-4">
        <NumberField
          control={control}
          name="from"
          placeholder="From"
          inputProps={{
            disabled: loadingCurrencies,
            onFocus: () => setActiveField("from"),
          }}
        />

        <CurrencySelect
          currencies={currencies}
          control={control}
          name="currencyFrom"
          setValue={setValue}
          defaultValue={"ETH"}
          disabled={loadingCurrencies}
        />

        <NumberField
          control={form.control}
          name="to"
          placeholder="To"
          inputProps={{
            disabled: loadingCurrencies,
            onFocus: () => setActiveField("to"),
          }}
        />

        <CurrencySelect
          currencies={currencies}
          control={control}
          name="currencyTo"
          setValue={setValue}
          defaultValue={"USD"}
          disabled={loadingCurrencies}
        />
      </form>
    </Form>
  );
};
