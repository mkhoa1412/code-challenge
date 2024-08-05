import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import NumberInput from "./numberInput";
import { API_BASE, inputGroupClassNames } from "../AppUtil";
import DropdownButton, { CurrencyListType } from "./dropdownButton";

type FormValues = {
  currencyToSend: string;
  amountToSend: number;
  currencyToReceive: string;
  amountToReceive: number;
};

export default function CurrencyForm() {
  const methods = useForm<FormValues>();
  const [currencyList, setCurrencyList] = useState<CurrencyListType[]>([]);
  const [amountToSend, setAmountToSend] = useState(0);
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [selectedCurrencyToSend, setSelectedCurrencyToSend] =
    useState<CurrencyListType | null>(null);
  const [selectedCurrencyToReceive, setSelectedCurrencyToReceive] =
    useState<CurrencyListType | null>(null);
  //Fetch data
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
        //set the default currency for currency to send and receive on load
        setSelectedCurrencyToReceive(filteredData[0]);
        setSelectedCurrencyToSend(filteredData[1]);
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      }
    };

    fetchCurrencies();
  }, []);
  // Recalculate when changing options
  const calculateAmountToReceive = (amount: number) => {
    if (selectedCurrencyToReceive && selectedCurrencyToSend) {
      const rate =
        selectedCurrencyToSend.price / selectedCurrencyToReceive.price;
      setAmountToReceive(amount * rate);
    }
  };

  // Recalculate when selectedCurrencyToSend or selectedCurrencyToReceive changes
  useEffect(() => {
    calculateAmountToReceive(amountToSend);
  }, [selectedCurrencyToSend, selectedCurrencyToReceive, amountToSend]);

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="max-w-screen-md w-2/3 bg-white rounded shadow-md p-4 text-black">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="space-y-2 flex-grow">
              <div className={inputGroupClassNames}>
                <DropdownButton
                  name="currencyToSend"
                  list={currencyList}
                  onChange={(currency) => {
                    setSelectedCurrencyToSend(currency);
                    calculateAmountToReceive(amountToSend);
                  }}
                  defaultValue={
                    currencyList.length > 0 ? currencyList[0].currency : ""
                  }
                />
                <NumberInput
                  name="amountToSend"
                  placeholder="Amount"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setAmountToSend(value);
                    calculateAmountToReceive(value);
                  }}
                />
              </div>
              <div className={inputGroupClassNames}>
                <DropdownButton
                  name="currencyToReceive"
                  list={currencyList}
                  onChange={(currency) => {
                    setSelectedCurrencyToReceive(currency);
                    calculateAmountToReceive(amountToSend);
                  }}
                  defaultValue={
                    currencyList.length > 0 ? currencyList[1].currency : ""
                  }
                />
                <NumberInput
                  name="amountToReceive"
                  value={amountToReceive}
                  readOnly
                />
              </div>
            </div>
            <button type="button" className="block basis-20">
              Swap
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
