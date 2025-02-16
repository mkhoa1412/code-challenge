import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";

import { tokenSwapSchema } from "./common/schemas";
import type { Currency, TokenSwapFieldValues } from "./common/types";
import ButtonPrimary from "./components/Buttons/ButtonPrimary";
import Select from "./components/Select";
import Spinner from "./components/Spinner/Spinner";
import TextField from "./components/TextField";
import useCurrencies from "./hooks/useCurrencies";
import useSystemTheme from "./hooks/useSystemTheme";
import currencyService from "./services/currency";

const App: FC = () => {
	const {
		control,
		formState: { errors, isSubmitting },
		handleSubmit,
		register,
		setValue,
	} = useForm<TokenSwapFieldValues>({
		defaultValues: {
			input: 0,
			inputCurrency: "ETH",
			output: 0,
			outputCurrency: "USD",
		},
		resolver: yupResolver(tokenSwapSchema),
	});
	useSystemTheme();
	const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies();
	const { inputCurrency, outputCurrency } = useWatch<TokenSwapFieldValues>({
		control,
	});

	const onSubmit: SubmitHandler<TokenSwapFieldValues> = async (data) => {
		const { input, inputCurrency, outputCurrency } = data;
		const result = await currencyService.swapCurrency({
			amount: input,
			input: inputCurrency,
			output: outputCurrency,
		});

		setValue("output", result);
	};

	if (isLoadingCurrencies) return <Spinner size="lg" />;

	if (!currencies) return null;

	const currenciesGroup = currencies.reduce<Record<string, Currency>>(
		(previous, current) =>
			Object.assign(previous, { [current.currency]: current }),
		{},
	);
	const inputCurrencyOptions = currencies.map(({ currency }) => (
		<option
			key={currency}
			disabled={currency === outputCurrency}
			value={currency}
		>
			{currency}
		</option>
	));
	const outputCurrencyOptions = currencies.map(({ currency }) => (
		<option
			key={currency}
			disabled={currency === inputCurrency}
			value={currency}
		>
			{currency}
		</option>
	));

	return (
		<div className="prose">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2 className="w-full">Swap</h2>
				<div className="flex">
					<div className="flex flex-wrap">
						<div className="form-control w-full max-w-xs">
							<label className="label" htmlFor="input-currency">
								<span className="label-text">Currency</span>
							</label>
							<Select id="input-currency" {...register("inputCurrency")}>
								{inputCurrencyOptions}
							</Select>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label" htmlFor="input">
								<span className="label-text">Amount to send</span>
							</label>
							<TextField
								id="input"
								min="0"
								step="0.01"
								required
								{...register("input")}
							/>
						</div>
					</div>
					<div className="divider divider-horizontal" />
					<div className="flex flex-wrap">
						<div className="form-control w-full max-w-xs">
							<label className="label" htmlFor="output-currency">
								<span className="label-text">Currency</span>
							</label>
							<Select id="output-currency" {...register("outputCurrency")}>
								{outputCurrencyOptions}
							</Select>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label" htmlFor="output">
								<span className="label-text">Amount to receive</span>
							</label>
							<TextField id="output" readOnly {...register("output")} />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 mt-4">
					<img
						alt={inputCurrency}
						className="m-0 max-w-[25px] max-h-[25px]"
						src={`/assets/tokens/${inputCurrency}.svg`}
					/>
					{inputCurrency && (
						<>
							<span>{currenciesGroup[inputCurrency].currency}</span>
							<span>{currenciesGroup[inputCurrency].price}</span>
						</>
					)}
				</div>
				<div className="flex items-center gap-2 mt-4">
					<img
						alt={outputCurrency}
						className="m-0 max-w-[25px] max-h-[25px]"
						src={`/assets/tokens/${outputCurrency}.svg`}
					/>
					{outputCurrency && (
						<>
							<span>{currenciesGroup[outputCurrency].currency}</span>
							<span>{currenciesGroup[outputCurrency].price}</span>
						</>
					)}
				</div>
				{Object.keys(errors).length > 0 && (
					<ul className="text-left text-red-500">
						{Object.entries(errors).map(([key, field]) => (
							<li key={key}>{field.message}</li>
						))}
					</ul>
				)}
				<div className="flex justify-start mt-4">
					<ButtonPrimary className="uppercase" loading={isSubmitting}>
						Confirm Swap
					</ButtonPrimary>
				</div>
			</form>
		</div>
	);
};

export default App;
