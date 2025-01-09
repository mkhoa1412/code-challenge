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
import { ICurrency } from "@/types/Currency";

interface IProps {
  currenciesData: {
    currencies: ICurrency[];
    loadingCurrencies: boolean;
  };
  convertData: {
    convertCryptoCurrency: (data: {
      amount: number;
      fromCurrency: string;
      toCurrency: string;
    }) => Promise<void>;
    loadingConvert: boolean;
  };
  setIsCompleted: (value: boolean) => void;
}

export const ConvertForm = ({
  currenciesData,
  convertData,
  setIsCompleted,
}: IProps) => {
  const { currencies, loadingCurrencies } = currenciesData;
  const { convertCryptoCurrency, loadingConvert } = convertData;

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

    setValue("to", `${convertedValue}`);
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

    setValue("from", `${convertedValue}`);
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
