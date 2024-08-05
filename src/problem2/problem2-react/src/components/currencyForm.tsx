import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { API_BASE, getDate, inputGroupClassNames } from "../AppUtil";
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
    mode: "onChange",
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
  const selectedCurrencyToSend = currencyList.find(
    (currency) => currency.currency === watch("currencyToSend")
  );
  const selectedCurrencyToReceive = currencyList.find(
    (currency) => currency.currency === watch("currencyToReceive")
  );
  const calculateAmountToReceive = (amount: number) => {
    if (selectedCurrencyToSend && selectedCurrencyToReceive) {
      const rate =
        selectedCurrencyToSend.price / selectedCurrencyToReceive.price;
      setValue("amountToReceive", amount * rate, { shouldValidate: true });
    }
  };

  const calculateAmountToSend = (amount: number) => {
    if (selectedCurrencyToSend && selectedCurrencyToReceive) {
      const rate =
        selectedCurrencyToReceive.price / selectedCurrencyToSend.price;
      setValue("amountToSend", amount * rate, { shouldValidate: true });
    }
  };

  // Watch the selected currencies and amount to send

  const amountToSend = watch("amountToSend");
  // Recalculate the amount to receive whenever the currencies or amount to send change
  useEffect(() => {
    calculateAmountToReceive(amountToSend);
  }, [selectedCurrencyToSend, selectedCurrencyToReceive, amountToSend]);

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
    <div className="max-w-screen-md sm:w-2/3 bg-zinc-700 rounded shadow-md p-4 text-white">
      <FormProvider {...methods}>
        <form noValidate={true} className="space-y-2">
          <div className="relative sm:flex sm:gap-2">
            <div className="space-y-12 sm:space-y-2 flex-grow">
              <div className={inputGroupClassNames}>
                <DropdownButton name="currencyToSend" list={currencyList} />
                <NumberInput
                  name="amountToSend"
                  placeholder="Amount to send"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value < 0) {
                      setValue("amountToSend", 0);
                    } else {
                      calculateAmountToReceive(value);
                    }
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
                    if (value < 0) {
                      setValue("amountToReceive", 0);
                    } else {
                      calculateAmountToSend(value);
                    }
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className="absolute sm:static left-1/2 top-[94px] -translate-x-1/2 sm:translate-x-0 basis-10 flex justify-center items-center"
              onClick={handleSwap}
            >
              <img
                src="/swap.svg"
                className="size-10 rounded-full p-2 rotate-90 bg-slate-300 transition-all bg-opacity-50 hover:bg-opacity-75"
                alt="Swap currencies"
              />
            </button>
          </div>
        </form>
      </FormProvider>
      {selectedCurrencyToReceive && selectedCurrencyToSend && (
        <div className="font-bold mt-2">
          <p>
            <span>1</span> {selectedCurrencyToSend.currency} =
          </p>
          <p className="text-2xl ">
            {`${
              selectedCurrencyToSend.price / selectedCurrencyToReceive.price
            } ${selectedCurrencyToReceive.currency}`}
          </p>
          <p className="font-normal ">
            Updated on {getDate(selectedCurrencyToSend.date)}
          </p>
        </div>
      )}
    </div>
  );
}
