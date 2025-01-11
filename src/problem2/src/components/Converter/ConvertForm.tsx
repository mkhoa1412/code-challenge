import { useState, useEffect } from "react";
import { CurrencySelect } from "@/components/Converter/CurrencySelect";
import { NumberField } from "@/components/NumberField";
import { SwapButton } from "@/components/Converter/SwapButton";
import { Button } from "@/components/ui/button";
import { convertCurrencyPrice } from "@/helpers/convertCurrencyPrice";
import { ConvertFormSchema } from "@/schemas/ConvertForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useConvertCryptoCurrency } from "@/api/useConvertCryptoCurrency";
import { useCryptoCurrencies } from "@/api/useCryptoCurrencies";
interface IProps {
  setIsCompleted: (value: boolean) => void;
}

export const ConvertForm = ({ setIsCompleted }: IProps) => {
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

  const form = useForm<z.infer<typeof ConvertFormSchema>>({
    resolver: zodResolver(ConvertFormSchema),
    defaultValues: {
      from: "0",
      to: "0",
      currencyFrom: "ETH",
      currencyTo: "USD",
    },
  });
  const { control, setValue, watch } = form;

  const {
    from: watchFrom,
    to: watchTo,
    currencyFrom: watchCurrencyFrom,
    currencyTo: watchCurrencyTo,
  } = watch();

  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  //Convert the currency when the active field changes
  // FROM -> TO or TO -> FROM
  useEffect(() => {
    if (!activeField) return;

    const isFromActive = activeField === "from";
    const sourceValue = isFromActive ? watchFrom : watchTo;
    const sourceCurrency = isFromActive ? watchCurrencyFrom : watchCurrencyTo;
    const targetField = isFromActive ? "to" : "from";
    const targetCurrency = isFromActive ? watchCurrencyTo : watchCurrencyFrom;

    const parsedValue = parseFloat(sourceValue);

    //Set the value to 0 if it's not a valid number
    if (isNaN(parsedValue)) {
      setValue(targetField, "0");
      return;
    }

    const convertedValue = convertCurrencyPrice({
      currencies,
      amount: parsedValue,
      fromCurrency: sourceCurrency,
      toCurrency: targetCurrency,
    });

    setValue(targetField, String(convertedValue));
  }, [
    activeField,
    watchFrom,
    watchTo,
    watchCurrencyFrom,
    watchCurrencyTo,
    currencies,
    setValue,
  ]);

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

  const onSubmit = async (data: z.infer<typeof ConvertFormSchema>) => {
    try {
      await convertCryptoCurrency({
        amount: parseFloat(data.from),
        fromCurrency: data.currencyFrom,
        toCurrency: data.currencyTo,
      });
      setIsCompleted(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  if (errorCurrencies || errorConvert) {
    return (
      <div className="text-sm text-red-500">
        {errorCurrencies || errorConvert}
      </div>
    );
  }

  return (
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
          Convert
          {loadingConvert && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
