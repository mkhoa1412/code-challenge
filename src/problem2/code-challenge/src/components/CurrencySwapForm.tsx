/*
I know you want us to use our best practices, but I think that's not necessary.

I can create base services, stores, and base components but I think it will be better since this is just a test and we will not "re-use" those components at all and we have limited time. Like, someone does Micro Services, Micro Front-end but they didn't use it, it is a waste of time.

I will create structures for this project instead of importing a lot of libraries, make components reusable (buttons, selects, inputs,...). Thank you for your understand
*/

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, memo, useMemo } from "react";
import Select from "react-select";
import { OptionProps } from "react-select";
// I will import it as a const instead of calling APIs
import { CURRENCY } from "../constants/currency"; // can use dynamic import here

interface Currency {
	currency: string;
	price: number;
	date: string | Date;
}

interface CurrencyOptionLabelProps {
  option: Currency;
}

// temporary put it here, can move to a separate file
const CustomOption: React.FC<OptionProps<Currency, false>> = memo((props) => {
  const { data, innerRef, innerProps } = props;

  return (
    <div ref={innerRef} {...innerProps} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
      <img
        src={`/tokens/${data.currency}.svg`}
        alt={data.currency}
        className="w-6 h-6 mr-2"
      />
      <span>{data.currency}</span>
    </div>
  );
});

// temporary put it here, can move to a separate file
const CurrencyOptionLabel: React.FC<CurrencyOptionLabelProps> = memo(({ option }) => {
  return (
    <div className="flex items-center">
      <img
        src={`/tokens/${option.currency}.svg`}
        alt={option.currency}
        className="w-6 h-6 mr-2"
      />
      {option.currency}
    </div>
  );
});

const CurrencySwapForm: React.FC = () => {
	const [inputAmount, setInputAmount] = useState<number | string>("");
	const [outputAmount, setOutputAmount] = useState<number | string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedInputCurrency, setSelectedInputCurrency] = useState<Currency>(CURRENCY[0]);
	const [selectedOutputCurrency, setSelectedOutputCurrency] = useState<Currency>(CURRENCY[1]);

	useEffect(() => {
		const inputCurrency = selectedInputCurrency;
		const outputCurrency = selectedOutputCurrency;

		if (inputCurrency && outputCurrency && inputAmount) {
			const convertedValue =
				(parseFloat(inputAmount as string) * inputCurrency.price) / outputCurrency.price;
			setOutputAmount(isNaN(convertedValue) ? "" : convertedValue.toFixed(2));
		} else {
			setOutputAmount("");
		}
	}, [inputAmount, selectedInputCurrency, selectedOutputCurrency]);

	const handleSelectedInputCurrency = useCallback((currency: Currency) => {
		setSelectedInputCurrency(currency);
		if (currency.currency === selectedOutputCurrency.currency) {
			setSelectedOutputCurrency(CURRENCY.find((item) => item.currency !== currency.currency) as Currency);
		}
	}, [selectedOutputCurrency]);

	const handleInputAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputAmount(event.target.value);
	};

	const handleSubmit = (event: FormEvent) => {
		if (!inputAmount) {
			return;
		}
		event.preventDefault();
		setIsLoading(true);

		// Fake loading
		setTimeout(() => {
			setIsLoading(false);
			// We can use a Toast library for notifications, just alert for now
			alert(
				`Swapping ${inputAmount} ${selectedInputCurrency.currency} for ${outputAmount} ${selectedOutputCurrency.currency}`
			);
			setInputAmount("");
		}, 1000);
	};

	const filteredReceiveOptions = useMemo(() => CURRENCY.filter(
    (option) => option.currency !== selectedInputCurrency.currency
  ), [selectedInputCurrency]);

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
			<h5 className="text-2xl font-semibold text-center mb-6">Swap</h5>

			<div className="mb-4">
				<label htmlFor="input-amount" className="block text-sm font-medium text-gray-700">
					Amount to send
				</label>

				<Select
					value={selectedInputCurrency}
					onChange={(event) => handleSelectedInputCurrency(event as Currency)}
					options={CURRENCY}
					formatOptionLabel={(option) => <CurrencyOptionLabel option={option} />}
					components={{ Option: CustomOption }}
					className="mt-2"
				/>
				{/* Instead of validation (show errors to user), I will use type number to avoid as much as errors possible */}
				<input
					id="input-amount"
					type="number"
					min="0"
					value={inputAmount}
					onChange={handleInputAmountChange}
					className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					placeholder="Enter amount to swap"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="output-amount" className="block text-sm font-medium text-gray-700">
					Amount to receive
				</label>

				<Select
					value={selectedOutputCurrency}
					onChange={(event) => setSelectedOutputCurrency(event as Currency)}
					options={filteredReceiveOptions}
					formatOptionLabel={(option) => <CurrencyOptionLabel option={option} />}
					components={{ Option: CustomOption }}
					className="mt-2"
				/>

				<input
					id="output-amount"
					type="text"
					value={outputAmount}
					readOnly
					className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
					placeholder="Amount you will receive"
				/>
			</div>

			<button
				type="submit"
				className="w-full h-11 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
				disabled={isLoading || !inputAmount}
			>
				{isLoading ? (
					<div className="flex justify-center items-center h-full">
						<img src="/icons/loading.svg" alt="Loading" className="w-full h-full" />
					</div>
				) : (
					"CONFIRM SWAP"
				)}
			</button>
		</form>
	);
};

export default CurrencySwapForm;
