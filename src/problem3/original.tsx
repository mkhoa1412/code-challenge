// @ts-nocheck

// Types like these should be extracted into a common place
interface WalletBalance {
	currency: string;
	amount: number;
}
// This one can extend WalletBalance as there are shared properties
interface FormattedWalletBalance {
	currency: string;
	amount: number;
	formatted: string;
}

interface Props extends BoxProps {}

// FC is already used so we can omit the type in the parameter
const WalletPage: FC<Props> = (props: Props) => {
	const { children, ...rest } = props;
	// Unimplemented hooks
	const balances = useWalletBalances();
	const prices = usePrices();

	// We should avoid using any type. This can be a string literal instead.
	const getPriority = (blockchain: any): number => {
		switch (blockchain) {
			case "Osmosis":
				return 100;
			case "Ethereum":
				return 50;
			case "Arbitrum":
				return 30;
			case "Zilliqa":
				return 20;
			case "Neo":
				return 20;
			default:
				return -99;
		}
	};

	const sortedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => {
				const balancePriority = getPriority(balance.blockchain);
				// Wrong variable name used
				if (lhsPriority > -99) {
					if (balance.amount <= 0) {
						return true;
					}
				}
				return false;
			})
			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
				const leftPriority = getPriority(lhs.blockchain);
				const rightPriority = getPriority(rhs.blockchain);
				if (leftPriority > rightPriority) {
					return -1;
					// else can be removed
				} else if (rightPriority > leftPriority) {
					return 1;
				}

				// Should return 0 for the same priority
			});
			// prices isn't used so it should be removed from the dependency array
	}, [balances, prices]);

	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed(),
		};
	});

	// Rendered items can be memoized to minimise the process of mounting and unmounting
	const rows = sortedBalances.map(
		(balance: FormattedWalletBalance, index: number) => {
			const usdValue = prices[balance.currency] * balance.amount;
			return (
				// Unimplemented component
				<WalletRow
					className={classes.row}
					// Using index as a key is an anti-pattern because the item order may be changed
					// and React cannot track it to optimise rendering
					key={index}
					amount={balance.amount}
					usdValue={usdValue}
					formattedAmount={balance.formatted}
				/>
			);
		},
	);

	return <div {...rest}>{rows}</div>;
};
