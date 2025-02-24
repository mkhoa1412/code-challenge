import { useState, useEffect } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props extends BoxProps {}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis': return 100;
    case 'Ethereum': return 50;
    case 'Arbitrum': return 30;
    case 'Zilliqa': return 20;
    case 'Neo': return 20;
    default: return -99;
  }
};

const getSortedBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return balances
    .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  const [sortedBalances, setSortedBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    setSortedBalances(getSortedBalances(balances));
  }, [balances]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed()}
          />
        );
      })}
    </div>
  );
};
