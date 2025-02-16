import type { Currency } from "../common/types";
import prices from "../data/prices.json";

class CurrencyService {
	getCurrencies(): Promise<Currency[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(prices);
			}, 700);
		});
	}
	swapCurrency(params: {
		amount: number;
		input: string;
		output: string;
	}): Promise<number> {
		const { amount, input, output } = params;
		const inputCurrency = prices.find(({ currency }) => currency === input);
		const outputCurrency = prices.find(({ currency }) => currency === output);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!inputCurrency || !outputCurrency) {
					return reject();
				}

				resolve((amount * inputCurrency.price) / outputCurrency.price);
			}, 700);
		});
	}
}

const currencyService = new CurrencyService();

export default currencyService;
