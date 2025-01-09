import { useCryptoCurrencies } from "@/api/useCryptoCurrencies";
import { CurrencySelect } from "@/components/CurrencySelect";
import { NumberField } from "@/components/NumberField";
import { Form } from "@/components/ui/form";
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
      currencyTo: "USDT",
    },
  });
  const { control, setValue } = form;

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
          }}
        />

        <CurrencySelect
          currencies={currencies}
          control={control}
          name="currencyTo"
          setValue={setValue}
          defaultValue={"USDT"}
          disabled={loadingCurrencies}
        />
      </form>
    </Form>
  );
};
