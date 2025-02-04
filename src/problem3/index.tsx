interface WalletBalance {
  currency: string;
  amount: number;
  //The blockchain property is a string, so it should be defined as a string in the interface.
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const blockchainPriorityMap: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => blockchainPriorityMap[blockchain] || -99;

  const sortedBalances = useMemo(() => {
    //I changed the filtering logic to keep only positive balances (balance.amount > 0), assuming you want to ignore zero or negative amounts.
    return balances
      .filter((balance: WalletBalance) => balance.amount > 0)  // Filter out non-positive balances
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;  // Simplified sort logic
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    //formatted: balance.amount.toFixed(2),
    //The formatted amount is fixed to two decimal places (balance.amount.toFixed(2)) for better presentation of values.
    formatted: balance.amount.toFixed(2),  // Format to 2 decimal places
  }));

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    //The price for each currency is fetched, with a fallback of 0 if the price is not found (prices[balance.currency] ? prices[balance.currency] * balance.amount : 0).
    const usdValue = prices[balance.currency] ? prices[balance.currency] * balance.amount : 0;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
