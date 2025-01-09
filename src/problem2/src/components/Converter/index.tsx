import { useConvertCryptoCurrency } from "@/api/useConvertCryptoCurrency";
import { useCryptoCurrencies } from "@/api/useCryptoCurrencies";
import { CurrencySelect } from "@/components/CurrencySelect";
import { NumberField } from "@/components/NumberField";
import { SwapButton } from "@/components/SwapButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { convertCurrencyPrice } from "@/helpers/convertCurrencyPrice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const {
    convertCryptoCurrency,
    loading: loadingConvert,
    error: errorConvert,
  } = useConvertCryptoCurrency();

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

  //Convert FROM -> TO
  useEffect(() => {
    if (activeField !== "from") return;

    //set value to 0 if not a valid number
    const fromNum = parseFloat(watchFrom);
    if (isNaN(fromNum)) return setValue("to", "0");

    const convertedValue = convertCurrencyPrice({
      currencies,
      amount: fromNum,
      fromCurrency: watchCurrencyFrom,
      toCurrency: watchCurrencyTo,
    });

    setValue("to", convertedValue.toString());
  }, [watchFrom, watchCurrencyFrom, watchCurrencyTo, activeField]);

  //Convert TO -> FROM
  useEffect(() => {
    if (activeField !== "to") return;

    //set value to 0 if not a valid number
    const toNum = parseFloat(watchTo);
    if (isNaN(toNum)) return setValue("from", "0");

    const convertedValue = convertCurrencyPrice({
      currencies,
      amount: toNum,
      fromCurrency: watchCurrencyTo,
      toCurrency: watchCurrencyFrom,
    });

    setValue("from", convertedValue.toString());
  }, [watchTo, watchCurrencyFrom, watchCurrencyTo, activeField]);

  const handleSwap = () => {
    // Swap the values
    setValue("from", watchTo);
    setValue("to", watchFrom);

    // Swap the currencies
    setValue("currencyFrom", watchCurrencyTo);
    setValue("currencyTo", watchCurrencyFrom);

    // Update the active field to trigger the appropriate conversion
    if (activeField === "from") {
      setActiveField("to");
    } else if (activeField === "to") {
      setActiveField("from");
    }
  };

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    try {
      await convertCryptoCurrency({
        amount: parseFloat(data.from),
        fromCurrency: data.currencyFrom,
        toCurrency: data.currencyTo,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return errorCurrencies || errorConvert ? (
    <div className="text-sm text-red-500">Failed to fetch currencies</div>
  ) : (
    <Form {...form}>
      <form
        className="flex flex-col gap-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
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
          </div>
          <SwapButton onClick={handleSwap} />
          <div className="flex items-center gap-4">
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
          </div>
        </div>

        <Button
          className="w-[50%] self-center"
          size="lg"
          type="submit"
          disabled={loadingConvert}
        >
          {loadingConvert && <Loader2 className="animate-spin" />}
          Swap
        </Button>
      </form>
    </Form>
  );
};
