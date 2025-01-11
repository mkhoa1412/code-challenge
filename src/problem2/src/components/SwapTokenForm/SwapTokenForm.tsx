import React, { useState, useMemo, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';

import Swal from 'sweetalert2'
import { FormControl, TextField, IconButton, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


import type { Currency, UserBalance } from '../../types/SwapToken';
import { CURRENCY, USER_WALLET } from '../../mocks/swap-form-data';
import { formStyles } from './variants';

import SelectToken from './selectToken';
import confirmSwap from './confirmSwap';

const SwapTokenForm: React.FC = () => {
	const [swapAmount, setSwapAmount] = useState<number | string>("");
	const [tokenLists, setTokenLists] = useState<Currency[]>([]);
	const [swapFrom, setSwapFrom] = useState<Currency>();
	const [swapTo, setSwapTo] = useState<Currency>();
	const [userBalance, setUserBalance] = useState<UserBalance[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		initGetUserInfo();
		initTokenInfo()
	}, []);

	const initGetUserInfo = async () => {
		try {
			const userInfoResponse = USER_WALLET;
			if (userInfoResponse) {
				setUserBalance(userInfoResponse);
			}
		} catch (error) {
			console.error('Failed to fetch user info', error);
		}
	};
	const initTokenInfo = async () => {
		try {
			const tokenInfoResponse = CURRENCY;
			if (tokenInfoResponse) {
				setTokenLists(tokenInfoResponse);
				setSwapFrom(tokenInfoResponse[0]);
				setSwapTo(tokenInfoResponse[1]);
			}
		} catch (error) {
			console.error('Failed to fetch token info', error);
		}
	};

	const handleSubmit = () => {
		if (!swapAmount || !swapFrom || !swapTo) {
			return;
		}
		// Fake submit data
		setIsLoading(true);
		const modalContent = ReactDOMServer.renderToString(confirmSwap({
			swapFromCurrency: swapFrom.currency,
			swapToCurrency: swapTo.currency,
			swapAmount: swapAmount,
			exchangeBalance: exchangeBalance
		}));
		Swal.fire({
			title: "Confirm swap",
			html: modalContent,
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm and swap"
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Transaction Submitted!",
					text: "Your transaction has been successfull.",
					icon: "success"
				});
			}
			setIsLoading(false);
		});
	};

	const handleChangeToken = (
		newValue: Currency,
		currentValue: Currency,
		setCurrentValue: React.Dispatch<React.SetStateAction<Currency | undefined>>,
		otherValue: Currency,
		setOtherValue: React.Dispatch<React.SetStateAction<Currency | undefined>>
	) => {
		setSwapAmount("");
		if (newValue === otherValue) {
			setOtherValue(currentValue);
			setCurrentValue(newValue);
		} else {
			setCurrentValue(newValue);
		}
	};

	const setMaxValue = () => {
		setSwapAmount(currentBalance);
	};

	const exchangeBalance = useMemo(() => {
		if (!swapAmount || !swapFrom || !swapTo) {
			return 0;
		}
		const convertedValue =
			(parseFloat(swapAmount as string) * swapFrom.price) / swapTo.price;
		return isNaN(convertedValue) ? 0 : convertedValue;
	}, [swapAmount, swapFrom, swapTo]);

	const currentBalance = useMemo(() => {
		if (!userBalance || !swapFrom) {
			return 0;
		}
		return userBalance?.find((token) => token?.currency === swapFrom.currency)?.amount ?? 0
	}, [userBalance, swapFrom]);

	return (
		<div className="p-8 bg-white rounded-lg shadow-lg w-[400px]">
			<h5 className="text-2xl font-semibold text-center mb-6">Swap Token</h5>
			<div className="mb-5" data-testid="swap-token-form">
				{
					tokenLists.length > 0 && swapFrom && swapTo &&
					<FormControl
						fullWidth
						size="small"
						variant="outlined"
						sx={{ padding: '10px 0' }}>
						<label className="block text-sm font-medium text-gray-700">
							Swap from
						</label>
						<SelectToken
							options={tokenLists}
							value={swapFrom}
							defaultValue={tokenLists[0].currency}
							handleChange={(newValue) =>
								handleChangeToken(newValue ?? tokenLists[0], swapFrom, setSwapFrom, swapTo, setSwapTo)
							}
						/>
						<span className={`${formStyles().amount()}`}>Balance: {currentBalance}</span>
					</FormControl>
				}
				<FormControl
					fullWidth
					size="small"
					variant="outlined"
					sx={{ padding: '10px 0' }}
				>
					<div className="flex justify-between">
						<label className="block text-sm font-medium text-gray-700">
							Amount
						</label>
						<Button onClick={setMaxValue} variant="text" className="!p-0 !m-0">Max</Button>
					</div>
					<TextField
						placeholder="0.00"
						type={'text'}
						onChange={(e) => {
							const value = e.target.value;
							const regex = /^[0-9.,]*$/;
							if (regex.test(value) || value === '') {
								setSwapAmount(value);
							}
						}}
						name={''}
						value={swapAmount}
						size="small"
					/>
					{swapFrom &&
						<span className={`${formStyles().amount()}`}>
							≈ ${(Number(swapAmount) * swapFrom.price).toFixed(2)}
						</span>
					}
				</FormControl>
				{
					swapTo && swapFrom &&
					<div className={`${formStyles().swapIconWrapper()}`}>
						<hr className="w-full" />
						<IconButton className={`${formStyles().swapButton()}`} size="small" onClick={() => handleChangeToken(swapTo, swapFrom, setSwapFrom, swapTo, setSwapTo)}>
							<img
								loading="lazy"
								src={`/icons/swap.svg`}
								className={`${formStyles().swapIcon()}`}
							/>
						</IconButton>
					</div>
				}
				{
					tokenLists.length > 0 && swapFrom && swapTo &&
					<FormControl
						fullWidth
						size="small"
						variant="outlined"
						sx={{ padding: '10px 0 0 0' }}>
						<label className="block text-sm font-medium text-gray-700">
							Swap to
						</label>
						<SelectToken
							options={tokenLists}
							value={swapTo}
							defaultValue={tokenLists[1].currency}
							handleChange={(newValue) =>
								handleChangeToken(newValue ?? tokenLists[1], swapTo, setSwapTo, swapFrom, setSwapFrom)
							}
						/>
					</FormControl>
				}
				{swapTo &&
					<span className={`${formStyles().amount()}`}>
						You get ≈ {exchangeBalance} {swapTo.currency}
					</span>
				}
			</div>
			<LoadingButton
				onClick={handleSubmit}
				endIcon={<CurrencyExchangeIcon />}
				loading={isLoading}
				loadingPosition="end"
				variant="contained"
				fullWidth
				disabled={!swapAmount}
			>
				Swap Token
			</LoadingButton>
		</div>
	);
};

export default SwapTokenForm;
