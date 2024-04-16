- We have some issues in this block
  + If all of code in same file, we have magic file -> Need to separate file
  + We have any type.
  + So many jobs in this component (SOLID principles).
  + Actually, we don't need to use useMemo, we just use it when our app have issue with performance. If we abuse it, we over engineering. And now, React is doing it for us.
  + We have some dead code.
  + We have component Page. In real app, Page component rarely define props with react hooks concept. Because data need to be pass here always side effect (we need to fetch it in somewhere).
  + We need to avoid key by index with React, replace it by unique field. (Recommend)

- My solution
  + I assume our app is not large, so I will use everything function is same file. If we have the larger app, we will create new folder (types, utils,...) and create small file then public it in index.ts.

<!-- directory/types/index.ts -->
type WalletBalance = {
  currency: string; I assume it is unique field in this type
  amount: number;
  blockchain: string; I assume that have string type.
}
- I remove FormattedWalletBalance. I don't think it's necessary,

<!-- directory/utils/index.ts -->
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100

    case 'Ethereum':
      return 50

    case 'Arbitrum':
      return 30

    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20

    default:
      return -99
  }
}

<!-- DISCLAIM: I'm not understand about context, this name function can be not right. -->
const isValidBalance = (balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain ?? '');
  
  return balancePriority > -99 && balance.amount > 0;
}

const compareBalanceByPriority = (lhs: WalletBalance, rhs: WalletBalance) => {
  const leftPriority = getPriority(lhs.blockchain ?? '');
  const rightPriority = getPriority(rhs.blockchain ?? '');

  return rightPriority - leftPriority;
}


<!-- directory/hooks/use-get-wallet-rows -->
export function useGetWalletRows = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const rows = balances
    .filter(isValidBalance)
    .sort(compareBalanceByPriority)
    .map((balance) => ({
      ...balance,
      usdValue: prices[balance.currency] ? prices[balance.currency] * balance.amount : 0
    }))

  return { rows }
}

<!-- directory/components/wallet-rows -->
export const WalletRows = () => {
  const { rows } = useGetWalletRows()

  return (
    <div>
      {rows.map((row) => (
        <WalletRow
          key={row.currency}
          className={classes.row}
          amount={row.amount}
          usdValue={row.usdValue}
          formattedAmount={row.amount.toFixed()}
        />
      );
    )}
    </div>
  )
}

<!-- There we have file  -->
<!-- directory/pages/wallet-page -->
export default WalletPage: React.FC<Props> = () => {
  return (
    <WalletRows />
  );
};

THANKS FOR READING!