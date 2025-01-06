/** Imported for using */
import { FC, memo, useMemo } from "react";
import useWalletBalances from "hooks/useWalletBalances";
import usePrices from "hooks/usePrices";
import WalletRow from "components/WalletRow";
import classes from "classes";

interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
interface BoxProps {}
interface Props extends BoxProps {}

// Define constants variable for a magic number and formatting
const INVALID_PRIORITY = -99;
const DECIMAL_PLACES = 2;

// Move getPriority function out of component scope to avoid re-creation on re-renders
const getPriority = (blockchain: string): number => {
  const priorities: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  return priorities[blockchain] ?? INVALID_PRIORITY;
};

// Moving logic get balances and prices out of render
const useFormattedBalance = (
  balances: WalletBalance[],
  prices: Record<string, number>
) => {
  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter(
        (balance) =>
          getPriority(balance.blockchain) > INVALID_PRIORITY &&
          balance.amount > 0
      )
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      )
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(DECIMAL_PLACES),
      }));
  }, [balances, prices]);

  return formattedBalances;
};

const WalletPage: FC<Props> = ({ className, ...props }) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();
  const formattedBalances = useFormattedBalance(balances, prices);

  // Add conditional rendering or fallback handling
  if (!balances || !balances.length) return <div>No balances available</div>;
  if (!prices) return <div>Loading Prices...</div>;

  // Ensure props are spread correctly for BoxProps handling
  return (
    <div className={className} {...props}>
      {formattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount || 0;
        return (
          <WalletRow
            className={classes.row}
            key={`${balance.currency}-${balance.blockchain}`}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};

export default memo(WalletPage);
