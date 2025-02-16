export type Blockchain =
	| "Arbitrum"
	| "Ethereum"
	| "Osmosis"
	| "Neo"
	| "Zilliqa";

export interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: Blockchain;
}

export interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
}
