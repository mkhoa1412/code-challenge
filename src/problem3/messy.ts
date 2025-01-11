interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Ensure blockchain is included
  }
  
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances(); // Custom hook to fetch wallet balances
    const prices = usePrices(); // Custom hook to fetch prices for currencies
  
    // Simplified priority mapping
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
  
    // Function to get priority based on blockchain
    const getPriority = (blockchain: string): number => priorityMap[blockchain] || -99;
  
    // Memoized calculation to sort and filter balances
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => balance.amount > 0 && getPriority(balance.blockchain) > -99)
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });
    }, [balances]);
  
    // Mapping sorted balances to rows
    const rows = useMemo(() => {
        return formattedBalances.map((balance) => {
          const usdValue = prices[balance.currency] * balance.amount;
          return (
            <WalletRow
              className={classes.row}
              key={`${balance.currency}-${balance.blockchain}`} // More robust key
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          );
        });
      }, [formattedBalances, prices]); // separates useMemo hooks for better readability and performance.
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  };