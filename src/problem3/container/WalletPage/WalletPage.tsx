import * as React from "react";
import WalletRow from "../../components/WalletRow/WalletRow";
import usePrices from "../../hooks/usePrices";
import useWalletBalances from "../../hooks/useWalletBalances";
import { formatBalance } from "../../utils/helpers";
import { WalletBalance } from "../../utils/type";

interface Props {
  rowClass?: string;
}
const WalletPage: React.FC<Props> = ({ rowClass }) => {
  const { sortedBalances } = useWalletBalances();
  const prices = usePrices();

  return (
    <div>
      {sortedBalances.map((balance: WalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formattedAmount = formatBalance(balance.amount);
        return (
          <WalletRow
            className={rowClass}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      })}
    </div>
  );
};
export default WalletPage;
