//1. Typing blockcahin to prevent any type
type TBlockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  //2. Add blockchain parameter
  blockchain: TBlockchain;
}

//3. Extend WalletBalance interface
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// 4. Move getPriority function outside of the component
//    to prevent it from being redefined on each render
const getPriority = (blockchain: TBlockchain): number => {
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

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return (
      balances
        ?.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);

          //5. - simplify if statements to make it more readable
          //   - change lhsPriority to balancePriority
          //   - remove balances with currency that has no price
          //   - change to balance.amount > 0
          //   otherwise we will see only empty balances in the list
          return (
            balancePriority > -99 &&
            prices[balance.currency] &&
            balance.amount > 0
          );
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);

          //6. Rewrite the if statements which also prevents
          //   the sort function from returning undefined
          return rightPriority - leftPriority;
        })
        //7. Move formatting logic to memoized function
        .map((balance: WalletBalance) => {
          return {
            ...balance,
            formatted: balance.amount.toFixed(),
          };
        }) ?? [] //8. Add default value to prevent null error
    );
  }, [balances, prices]);

  const rows =
    //9. Use formattedBalances here
    formattedBalances?.map(
      (
        //10. Destructure balance object to make it more readable
        { blockchain, amount, currency, formatted }: FormattedWalletBalance
      ) => {
        const usdValue = prices[currency] * amount;

        return (
          <WalletRow
            //11. Use reliable and unique key instead of index
            key={`${currency}_${blockchain}`}
            className={classes.row}
            amount={amount}
            usdValue={usdValue}
            formattedAmount={formatted}
          />
        );
      }
    );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
