export type TokenSwapFieldValues = {
	input: number;
	inputCurrency: string;
	output?: number;
	outputCurrency: string;
};

export type ComponentSize = "xs" | "sm" | "md" | "lg";

export type Currency = {
	currency: string;
	date: string;
	price: number;
};
