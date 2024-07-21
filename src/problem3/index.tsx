interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockChain;
}
interface BlockChain {
  name: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
interface BoxProps {}
interface Props extends BoxProps {}

const classes = {
  row: 'aaaa',
};

// function external
const useWalletBalances = (): WalletBalance[] => {
  return [];
};
// function external
const usePrices = () => {
  //handle
  return {};
};
const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: BlockChain): number => {
    const objValue: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return objValue[blockchain.name] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`index_${balance.currency}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
