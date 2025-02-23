export type UnitValueData = {
	baseValue: number;
	baseSymbolUnit: string;
	others: {
		[symbol: string]: number;
	};
};
