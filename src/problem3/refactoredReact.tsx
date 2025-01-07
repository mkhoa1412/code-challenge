interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

enum Blockchain {
  OSMOSIS = 'Osmosis',
  ETHEREUM = 'Ethereum',
  ARBITRUM = 'Arbitrum',
  ZILLIQA = 'Zilliqa',
  NEO = 'Neo',
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Determine priority for sorting
  const getPriority = (blockchain: string): number => {
    const priorities: Record<Blockchain, number> = {
      [Blockchain.OSMOSIS]: 100,
      [Blockchain.ETHEREUM]: 50,
      [Blockchain.ARBITRUM]: 30,
      [Blockchain.ZILLIQA]: 20,
      [Blockchain.NEO]: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  // Filter and sort balances
  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
      }));
  }, [balances]);

  // Generate rows for rendering
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = (prices?.[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue.toFixed(2)}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
