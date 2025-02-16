import useSWR from "swr";

import currencyService from "../../services/currency";

const useCurrencies = () => {
	return useSWR("currencies", () => currencyService.getCurrencies(), {
		revalidateOnFocus: false,
	});
};

export default useCurrencies;
