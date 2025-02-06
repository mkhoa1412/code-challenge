import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "./components/Label";
import InputNumber from "./components/InputNumber";
import ErrorMessage from "./components/ErrorMessage";
import ArrowDownIcon from "./components/ArrowDownIcon";
import Input from "./components/Input";
import { tokens } from "./temp/Price";
import ReactSelect from "react-select";

const fee = 0.003; // 0.3% fee

const schema = yup.object().shape({
  amountToSend: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount to send is required"),
});

const TokenExchangeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);

  const onSubmit = (data) => {
    alert(
      `Amount to send: ${data.amountToSend} ${fromToken?.value}, Amount to receive: ${data?.amountToReceive} ${toToken?.value}`
    );
  };

  const calculateSwapAmount = () => {
    const amountToSend = watch("amountToSend");
    if (!amountToSend) return setValue("amountToReceive", 0);;
    const fromTokenPrice = fromToken?.price;
    const toTokenPrice = toToken?.price;
    const amountToReceive =
      amountToSend * (fromTokenPrice / toTokenPrice) * (1 - fee);
    setValue("amountToReceive", amountToReceive.toFixed(2));
  };

  useEffect(() => {
    calculateSwapAmount();
  }, [watch("amountToSend"), fromToken, toToken]);

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
            onChange={(e) =>
              setValue("amountToSend", parseFloat(e.target?.value))
            }
            placeholder="Enter amount to send"
            name="amountToSend"
          />
          {errors.amountToSend && (
            <ErrorMessage>{errors.amountToSend.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="fromToken">From Token:</Label>
          <ReactSelect
            id="fromToken"
            value={fromToken}
            onChange={(value) => {
              setFromToken(value);
            }}
            // className="border border-gray-300 rounded-md p-1 focus:outline-none text-sm"
            formatOptionLabel={(option) => (
              <div className="flex items-center">
                <img
                  src={option?.icon}
                  alt={option?.value}
                  className="w-5 h-5 mr-2"
                />
                {option?.value}
              </div>
            )}
            formatOptionValue={(option) => (
              <div className="flex items-center">
                <img
                  src={option?.icon}
                  alt={option?.value}
                  className="w-5 h-5 mr-2"
                />
                {option?.value}
              </div>
            )}
            options={tokens}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="toToken">To Token:</Label>
          <ReactSelect
            id="toToken"
            value={toToken}
            onChange={(value) => {
              setToToken(value);
            }}
            // className="border border-gray-300 rounded-md p-1 focus:outline-none text-sm"
            formatOptionLabel={(option) => (
              <div className="flex items-center">
                <img
                  src={option?.icon}
                  alt={option?.value}
                  className="w-5 h-5 mr-2"
                />
                {option?.value}
              </div>
            )}
            formatOptionValue={(option) => (
              <div className="flex items-center">
                <img
                  src={option?.icon}
                  alt={option?.value}
                  className="w-5 h-5 mr-2"
                />
                {option?.value}
              </div>
            )}
            options={tokens}
          />
        </div>

        <div className="mx-auto rounded-full border border-gray-300 bg-gray-200 p-1.5">
          <ArrowDownIcon />
        </div>

        <div className="flex flex-col gap-1">
          {/* <Label htmlFor="amountToReceive">Amount <span className="font-bold text-sm">{toToken?.value}</span> to receive (fee: 0,03%):</Label> */}
          {/* get estimated gas fee */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">
              Estimated gas fee: 0.0003 {fromToken?.value}
            </span>
            {/* max fee */}
            <span className="text-xs text-gray-500">
              Max fee: 0.003 {fromToken?.value}
            </span>
            {/* estimated slippage */}
            <span className="text-xs text-gray-500">
              Estimated slippage: 0.1%
            </span>
            <span className="text-xs text-gray-500">
              Exchange rate: 1 {fromToken?.value} ={" "}
              {fromToken?.price?.toFixed(6)} {toToken?.value}
            </span>
          </div>

          <Input
            id="amountToReceive"
            register={register}
            name="amountToReceive"
            isReadOnly
          />
        </div>

        <button
          type="submit"
          disabled={!watch("amountToSend")}
          className="disabled:bg-gray-400 text-xs font-semibold bg-blue-500 rounded border-none py-2 text-white mt-2"
        >
          CONFIRM SWAP
        </button>
      </form>
    </div>
  );
};

export default TokenExchangeForm;
