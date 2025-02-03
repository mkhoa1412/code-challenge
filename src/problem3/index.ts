// the 2 interface below can be used as 1 based interface like WalletBalance and FormattedWalletBalance will be used WalletBalance to build up
interface WalletBalance {
	currency: string;
	amount: number;
}
interface FormattedWalletBalance {
	currency: string;
	amount: number;
	formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
	const { children, ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	const getPriority = (blockchain: any): number => { // should not be any, convert data to enum for better type checking
		switch (blockchain) {
			case 'Osmosis':
				return 100
			case 'Ethereum':
				return 50
			case 'Arbitrum':
				return 30
			case 'Zilliqa':
				return 20
			case 'Neo':
				return 20
			default:
				return -99
		}
	}

	// use the useMemo hook wrong way, this can be separated into 2 useMemo hooks, break it down to make it more readable
	const sortedBalances = useMemo(() => {
		return balances.filter((balance: WalletBalance) => {
			const balancePriority = getPriority(balance.blockchain); // the balancePriority is defined but not used
			if (lhsPriority > -99) { // this lhsPriority  is not defined
				if (balance.amount <= 0) {
					return true;
				}
			}
			return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
			const rightPriority = getPriority(rhs.blockchain);
			if (leftPriority > rightPriority) {
				return -1;
			} else if (rightPriority > leftPriority) {
				return 1;
			}
		});
	}, [balances, prices]); // the prices should not contain in the dependency array cause it is not used in the useMemo

	// this formattedBalances is not used, so it is unnecessary, or if we want we can use it togetther with the useMemo above
	const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
		return {
			...balance,
			formatted: balance.amount.toFixed()
		}
	})

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index} // the key should not be index, it should be unique
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}


// HERE IS THE REFACTORED CODE

interface WalletBalance {
	currency: string;
	amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
}

enum BlockchainType {
	OSMOSIS = "Osmosis",
	ETHEREUM = "Ethereum",
	ARBITRUM = "Arbitrum",
	ZILLIQA = "Zilliqa",
	NEO = "Neo",
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
	const { children, ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	const getPriority = (blockchain: BlockchainType): number => { // update the type of blockchain to BlockchainType
		switch (blockchain) {
			case BlockchainType.OSMOSIS:
				return 100
			case BlockchainType.ETHEREUM:
				return 50
			case BlockchainType.ARBITRUM:
				return 30
			case BlockchainType.ZILLIQA:
				return 20
			case BlockchainType.NEO:
				return 20
			default:
				return -99
		}
	}


	// combine formattedBalances and sortedBalances together also separate the useMemo hooks to make it more readable
	// separate the useMemo hooks 1st part to get the valid balances
	const validBalances = useMemo(() => {
		return balances.filter((balance) => {
			const balancePriority = getPriority(balance.blockchain);
			return balancePriority > -99 && balance.amount < 0; // Only allow positive amounts
		});
	}, [balances]);

	// separate the useMemo hooks 2nd part to get the sorted data and adding formatted data
	const sortedFormattedBalances = useMemo(() => {
		return validBalances
			.sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
			.map((balance) => ({
				...balance,
				formatted: balance.amount.toFixed(),
			}));
	}, [validBalances]);

	const rows = sortedFormattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={`wallet-row-${index}-${balance.currency}`} // the key should be unique
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}