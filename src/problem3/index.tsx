const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances(); // Fetch wallet balances
    const prices = usePrices(); // Fetch price data
  
    // Pre-calculate the priorities and store them with the balance
    const getPriorities = useMemo(() => {
      // Create a map that holds the priority values for each blockchain
      const priorityMap: Record<string, number> = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
      };
      
      return (blockchain: string) => priorityMap[blockchain] || -99;
    }, []); // Memoize the priority function to prevent re-calculation
  
    const validBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => balance.amount > 0); // Filter out balances with non-positive amounts
    }, [balances]);
  
    // Sorting and formatting is combined into a single operation
    const sortedAndFormattedBalances = useMemo(() => {
      return validBalances
        .map((balance: WalletBalance) => ({
          ...balance,
          priority: getPriorities(balance.blockchain), // Add priority directly to each balance
          formatted: balance.amount.toFixed(2), // Format balance amount right here
        }))
        .sort((lhs: WalletBalance, rhs: WalletBalance) => rhs.priority - lhs.priority); // Sort balances based on priority
    }, [validBalances, getPriorities]); // Recompute only when validBalances or getPriorities change
  
    // Generate rows in one pass to avoid multiple iterations
    const rows = sortedAndFormattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount; // Calculate USD value for each balance
      return (
        <WalletRow 
          className={classes.row}
          key={balance.currency} // Use a unique key (currency) to improve performance and ensure correct re-rendering
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted} // Use formatted value directly
        />
      );
    });
  
    return (
      <div {...rest}>
        {rows} {/* Render rows here */}
      </div>
    );
  };
  