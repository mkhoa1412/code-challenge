import type { WalletBalance } from "../../common/types";

const useWalletBalances = () => {
	const balances: WalletBalance[] = [
		{ amount: 1, blockchain: "Arbitrum", currency: "VND" },
	];

	return balances;
};

export default useWalletBalances;
