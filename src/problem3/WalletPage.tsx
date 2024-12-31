import React, { useMemo } from "react";

// Clear definition of blockchain types
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; //Added missing blockchain field
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
/**
 * Move blockchain priorities to a constant object
 * to avoid recreation on each render,
 * maintain priorities in one place,
 * and allow TypeScript to catch invalid blockchain names
 */
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

// Extract formatting logic into a pure function to improve testability and reduce component complexity
const formatBalance = (balance: WalletBalance): FormattedWalletBalance => ({
  ...balance,
  formatted: balance.amount.toFixed(),
});

export const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  /**
   * Avoid unnecessary recalculations by using a dependency array to update only when needed.
   */
  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return usdValue > 5;
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
        //Safe access to priorities with fallback
        const priorityA = BLOCKCHAIN_PRIORITIES[a.blockchain] ?? -99;
        const priorityB = BLOCKCHAIN_PRIORITIES[b.blockchain] ?? -99;
        return priorityB - priorityA;
      })
      .map(formatBalance);
  }, [balances, prices]);

  return (
    <div {...rest}>
      {sortedAndFormattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          //Better key composition
          <WalletRow
            key={`${balance.currency}-${balance.amount}`}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
