import React, { ReactNode, useMemo } from "react";
import WalletRow from "./components/wallet-row.component";
import { useWalletBalances } from "./hooks/balances.hook";
import { usePrices } from "./hooks/prices.hook";

interface Props {
  children?: ReactNode;
}

const getPriority = (blockchain: string): number => {
  const priorityMap: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };

  return priorityMap[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) =>
          getPriority(balance.blockchain) !== -99 && balance.amount > 0
      )
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));

  return (
    <div {...rest}>
      {formattedBalances.map((balance, index) => (
        <WalletRow
          key={index}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;
