import React, { ReactNode, useMemo } from "react";
import classes from "./WalletPage.module.css";

/* 
  For type, I decided to use the prefix 'T', because the
  first letter of 'type' is 'T'
*/
type TBlockChain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

/* 
  For interface, I decided to use the prefix 'I', because the
  first letter of 'interface' is 'I'
*/
interface IWalletBalance {
  currency: string;
  amount: number;
  blockchain: TBlockChain;
}

interface IFormattedWalletBalance extends IWalletBalance {
  formatted: string;
}

interface IProps {
  children?: ReactNode;
}

/* Move this function outside the component to avoid unnecessary rerenders */
const getPriority = (blockchain: TBlockChain): number => {
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

const WalletPage: React.FC<IProps> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances: IWalletBalance[] = useMemo(
    () =>
      balances
        ?.filter(
          (balance: IWalletBalance) =>
            getPriority(balance.blockchain) > -99 && balance.amount >= 0 // Ensure balance with amount 0 still appears
        )
        ?.sort((a: IWalletBalance, b: IWalletBalance) => {
          const leftPriority = getPriority(a.blockchain);
          const rightPriority = getPriority(b.blockchain);
          /* 
            I think there's a bug here, it should be leftPriority < rightPriority 
            instead of rightPriority > leftPriority, because the higher the priority
          */
          if (leftPriority < rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        }),
    [balances]
  );

  const formattedBalances: IFormattedWalletBalance[] = useMemo(
    () =>
      sortedBalances?.map((balance: IWalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      })),
    [sortedBalances]
  );

  const rows = useMemo(
    () =>
      formattedBalances?.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={`${balance.currency}-${balance.blockchain}`} // Use unique key to prevent issues if wallet position is switched
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }),
    [prices, formattedBalances]
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
