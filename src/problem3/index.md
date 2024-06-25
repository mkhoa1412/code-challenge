# Performance Issues and Anti-patterns

1. The filtering logic in sortedBalances is incorrect. The comparison variable lhsPriority is undefined, which will lead to runtime errors.
2. The formattedBalances array is created but not used.
3. prices is included in the dependency array of useMemo, but it's not used within the memoized function.

## Refactored Code

<!-- TypeScript -->

` interface WalletBalance {
   blockchain: string;
   currency: string;
   amount: number;
 }
 interface FormattedWalletBalance extends WalletBalance {
   formatted: string;
 }

 interface Props extends BoxProps {}

 const WalletPage: React.FC<Props> = (props: Props) => {
   const { children, ...rest } = props;
   const balances = useWalletBalances();
   const prices = usePrices();

   const getPriority = (blockchain: string): number => {
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
         return balancePriority > -99 && balance.amount > 0;
       })
       .sort((lhs: WalletBalance, rhs: WalletBalance) => {
         const leftPriority = getPriority(lhs.blockchain);
         const rightPriority = getPriority(rhs.blockchain);
         return rightPriority - leftPriority;
       });
   }, [balances]);

   const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
     const formattedAmount = balance.amount.toFixed();
     const usdValue = prices[balance.currency] * balance.amount;
     return (
       <WalletRow
         className={classes.row}
         key={index}
         amount={balance.amount}
         usdValue={usdValue}
         formattedAmount={formattedAmount}
       />
     );
   });

   return <div {...rest}>{rows}</div>;
 };
`