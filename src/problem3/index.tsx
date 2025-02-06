/*
1. Unnecessary Filtering Logic:

The filtering logic in sortedBalances is incorrect. The condition if (lhsPriority > -99) should be if (balancePriority > -99). Additionally, the condition if (balance.amount <= 0) returns true when the balance is less than or equal to zero, which is likely not the intended behavior. This would filter out valid balances, leading to incorrect results.

2. Inefficient Sorting:

The sorting logic is inefficient because it recalculates the priority for each balance every time the component renders. This can be optimized by calculating the priority once and storing it.

3. Unused Variables:

The formattedBalances array is created but never used. This is unnecessary computation and memory usage.

4. Missing Dependency in useMemo:

The useMemo hook for sortedBalances depends on balances but not on prices. However, prices is used in the rendering logic, so if prices changes, the component should re-render. This is not a direct inefficiency but could lead to unexpected behavior.

5. Direct Access to prices:

The code directly accesses prices[balance.currency] without checking if prices is defined or if the currency exists in prices. This could lead to runtime errors.

6. Redundant Type Annotations:

The type annotations for sortedBalances and formattedBalances are redundant since TypeScript can infer these types.

7. Potential Key Collision:

Using the array index as the key in rows can lead to issues if the list order changes. It's better to use a unique identifier from the data itself.
*/
import React, { useMemo } from 'react';
import WalletRow from './WalletRow';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
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


  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency]
      ? prices[balance.currency] * balance.amount
      : 0;
    const formattedBalance: FormattedWalletBalance = {
      ...balance,
      formatted: balance.amount.toFixed(),
    };

    return (
      <WalletRow
        className={classes.row}
        key={`${balance.currency}-${balance.blockchain}`}
        amount={formattedBalance.amount}
        usdValue={usdValue}
        formattedAmount={formattedBalance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};