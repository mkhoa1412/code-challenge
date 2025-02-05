import { getPriority } from "../utils/helpers";
import { WalletBalance, WalletBalanceSortPriority } from "../utils/type";

const useWalletBalances = (
  sortType: WalletBalanceSortPriority = WalletBalanceSortPriority.LEFT
) => {
  // some logic to get and handle balances

  return {
    balances,
    sortedBalances: balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (sortType === WalletBalanceSortPriority.LEFT) {
          Number(leftPriority) - Number(rightPriority);
        }
        return Number(rightPriority) - Number(leftPriority);
      }) as WalletBalance[],
  };
};
export default useWalletBalances;
