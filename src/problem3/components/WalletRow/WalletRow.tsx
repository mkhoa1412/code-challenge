import React, { type FC, type HTMLAttributes } from "react";
import Box from "../Box";

interface WalletRowProps extends HTMLAttributes<HTMLDivElement> {
	amount: number;
	usdValue: number;
	formattedAmount: string;
}

const WalletRow: FC<WalletRowProps> = (props: WalletRowProps) => {
	const { amount, formattedAmount, usdValue } = props;

	return (
		<Box>
			{amount} {formattedAmount} {usdValue}
		</Box>
	);
};

export default WalletRow;
