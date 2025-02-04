import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "./components/Label";
import InputNumber from "./components/InputNumber";
import ErrorMessage from "./components/ErrorMessage";
import ArrowDownIcon from "./components/ArrowDownIcon";
import Input from "./components/Input";

const API_URL = `https://api.exchangerate-api.com/v4/latest`; // Exchangerate-API

const schema = yup.object().shape({
  amountToSend: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount to send is required"),
});

const CurrencyExchangeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [exchangeRate, setExchangeRate] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("VND");
  const [currencies, setCurrencies] = useState([]);

  const handleAmountChange = (amount) => {
    if (isNaN(amount)) {
      return setValue("amountToReceive", 0);
    }
    setValue("amountToReceive", amount * exchangeRate);
  };

  const onSubmit = (data) => {
    alert(
      `Amount to send: ${data.amountToSend} ${fromCurrency}, Amount to receive: ${data?.amountToReceive} ${toCurrency}`
    );
  };

  const getExchangeRate = async () => {
    axios
      .get(`${API_URL}/${fromCurrency}`)
      .then((response) => {
        const rates = response.data.rates;
        setExchangeRate(rates[toCurrency]);
        setCurrencies(Object.keys(rates));
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  };

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency]);

  useEffect(() => {
    handleAmountChange(watch('amountToSend'));
  }, [watch('amountToSend'), fromCurrency, toCurrency]);

  return (
    <div className="m-auto mt-20 max-w-sm p-5 border border-gray-200 rounded-md">
      <h2 className="font-semibold text-2xl text-gray-800 text-center">Swap</h2>

      <form
        className="w-full flex flex-col gap-2 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="amountToSend">Amount to send:</Label>
          <InputNumber
            id="amountToSend"
            register={register}
            onChange={(e) => setValue( 'amountToSend',parseFloat(e.target?.value))}
            placeholder="Enter amount to send"
            name="amountToSend"
          />
          {errors.amountToSend && (
            <ErrorMessage>{errors.amountToSend.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="fromCurrency">From Currency:</Label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border border-gray-300 rounded-md p-1 focus:outline-none text-sm"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="toCurrency">To Currency:</Label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border border-gray-300 rounded-md p-1 focus:outline-none text-sm"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="mx-auto rounded-full border border-gray-300 bg-gray-200 p-1.5">
          <ArrowDownIcon />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="amountToReceive">Amount <span className="font-bold text-sm">{toCurrency}</span> to receive:</Label>
          <Input
            id="amountToReceive"
            register={register}
            name="amountToReceive"
            isReadOnly
          />
        </div>

        <button
          type="submit"
          disabled={!watch('amountToSend')}
          className="disabled:bg-gray-400 text-xs font-semibold bg-blue-500 rounded border-none py-2 text-white mt-2"
        >
          CONFIRM SWAP
        </button>
      </form>
    </div>
  );
};

export default CurrencyExchangeForm;
