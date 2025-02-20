interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number =>
  BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;

const WalletPage: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;

  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance) => {
        return getPriority(balance.blockchain) > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      })
      .map((balance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(2),
        };
      });
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.amount}`}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
