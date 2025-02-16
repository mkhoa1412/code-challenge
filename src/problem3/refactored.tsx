import React, { useMemo, type FC } from "react";

import type { FormattedWalletBalance } from "./common/types";
import { getPriority } from "./common/utils";
import Box, { type BoxProps } from "./components/Box";
import WalletRow from "./components/WalletRow";
import usePrices from "./hooks/usePrices";
import useWalletBalances from "./hooks/useWalletBalances";

const classes = {
	row: "",
};

interface WalletPageProps extends BoxProps {}

const WalletPage: FC<WalletPageProps> = (props) => {
	const { children, ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	const sortedBalances = useMemo(() => {
		return balances
			.filter((balance) => {
				const lhsPriority = getPriority(balance.blockchain);

				if (lhsPriority > -99 && balance.amount <= 0) return true;

				return false;
			})
			.sort((lhs, rhs) => {
				const leftPriority = getPriority(lhs.blockchain);
				const rightPriority = getPriority(rhs.blockchain);

				if (leftPriority > rightPriority) {
					return -1;
				}

				if (rightPriority > leftPriority) {
					return 1;
				}

				return 0;
			});
	}, [balances]);

	const formattedBalances = useMemo(
		() =>
			sortedBalances.map<FormattedWalletBalance>((balance) => ({
				...balance,
				formatted: balance.amount.toFixed(),
			})),
		[sortedBalances],
	);

	const rows = useMemo(
		() =>
			formattedBalances.map(({ amount, blockchain, currency, formatted }) => {
				const usdValue = prices[currency] * amount;

				return (
					<WalletRow
						className={classes.row}
						key={`${amount}-${blockchain}-${currency}-${formatted}`}
						amount={amount}
						usdValue={usdValue}
						formattedAmount={formatted}
					/>
				);
			}),
		[formattedBalances, prices],
	);

	return <Box {...rest}>{rows}</Box>;
};

export default WalletPage;
