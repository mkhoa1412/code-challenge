import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_BASE, inputGroupClassNames } from "../AppUtil";
import DropdownButton, { CurrencyListType } from "./DropdownButton";
import NumberInput from "./NumberInput";

type FormValues = {
  currencyToSend: string;
  amountToSend: number;
  currencyToReceive: string;
  amountToReceive: number;
};

export default function CurrencyForm() {
  const [currencyList, setCurrencyList] = useState<CurrencyListType[]>([]);
  const methods = useForm<FormValues>({
    defaultValues: {
      amountToSend: 0,
      amountToReceive: 0,
      currencyToSend: "",
      currencyToReceive: "",
    },
  });
  const { setValue, watch } = methods;

  // Fetch data
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(API_BASE);
        const data: CurrencyListType[] = await response.json();
        const filteredData = Array.from(
          data
            .reduce((map, item) => map.set(item.currency, item), new Map())
            .values()
        );
        setCurrencyList(filteredData);

        // Set the default currency for currency to send and receive on load
        setValue("currencyToSend", filteredData[0].currency);
        setValue("currencyToReceive", filteredData[1].currency);
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      }
    };

    fetchCurrencies();
  }, [setValue]);

  const calculateAmountToReceive = (amount: number) => {
    const selectedCurrencyToSend = currencyList.find(
      (currency) => currency.currency === watch("currencyToSend")
    );
    const selectedCurrencyToReceive = currencyList.find(
      (currency) => currency.currency === watch("currencyToReceive")
    );
    if (selectedCurrencyToSend && selectedCurrencyToReceive) {
      const rate =
        selectedCurrencyToSend.price / selectedCurrencyToReceive.price;
      setValue("amountToReceive", amount * rate);
    }
  };

  const calculateAmountToSend = (amount: number) => {
    const selectedCurrencyToSend = currencyList.find(
      (currency) => currency.currency === watch("currencyToSend")
    );
    const selectedCurrencyToReceive = currencyList.find(
      (currency) => currency.currency === watch("currencyToReceive")
    );
    if (selectedCurrencyToSend && selectedCurrencyToReceive) {
      const rate =
        selectedCurrencyToReceive.price / selectedCurrencyToSend.price;
      setValue("amountToSend", amount * rate);
    }
  };

  const onSubmit = (data: FormValues) => console.log(data);

  // Watch the selected currencies and amount to send
  const currentCurrencyToSend = watch("currencyToSend");
  const currentCurrencyToReceive = watch("currencyToReceive");
  const amountToSend = watch("amountToSend");

  // Recalculate the amount to receive whenever the currencies or amount to send change
  useEffect(() => {
    if (currencyList.length > 0) {
      calculateAmountToReceive(amountToSend);
    }
  }, [
    currentCurrencyToSend,
    currentCurrencyToReceive,
    amountToSend,
    currencyList,
  ]);

  const handleSwap = () => {
    const tempAmountToSend = methods.getValues("amountToSend");
    const tempCurrencyToSend = methods.getValues("currencyToSend");

    setValue("currencyToSend", methods.getValues("currencyToReceive"));
    setValue("currencyToReceive", tempCurrencyToSend);

    setValue("amountToSend", methods.getValues("amountToReceive"));
    setValue("amountToReceive", tempAmountToSend);

    calculateAmountToReceive(tempAmountToSend);
  };

  return (
    <div className="max-w-screen-md w-2/3 bg-white rounded shadow-md p-4 text-black">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate={true}>
          <div className="flex gap-2">
            <div className="space-y-2 flex-grow">
              <div className={inputGroupClassNames}>
                <DropdownButton name="currencyToSend" list={currencyList} />
                <NumberInput
                  name="amountToSend"
                  placeholder="Amount to send"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    calculateAmountToReceive(value);
                  }}
                />
              </div>
              <div className={inputGroupClassNames}>
                <DropdownButton name="currencyToReceive" list={currencyList} />
                <NumberInput
                  name="amountToReceive"
                  placeholder="Amount to receive"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    calculateAmountToSend(value);
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className="basis-10 flex justify-center items-center"
              onClick={handleSwap}
            >
              <img
                src="/swap.svg"
                className="size-10 border rounded-full p-2 rotate-90"
                alt="Swap currencies"
              />
            </button>
          </div>
          <button type="submit" className="block">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
