import { HTMLProps } from "react";

type Blockchain = string;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

type FormattedWalletBalance = WalletBalance & {
  formatted: string;
};

type Props = Omit<HTMLProps<HTMLDivElement>, "children">;

const mapPriority: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number => {
  return mapPriority[blockchain] ?? -99;
};

const checkIsInvalidBalance = (balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (balancePriority > -99 && balance.amount <= 0) {
    return true;
  }
  return false;
};

const sortBlockchain = (left: Blockchain, right: Blockchain) => {
  const leftPriority = getPriority[left];
  const rightPriority = getPriority[right];

  if (leftPriority > rightPriority) {
    return -1;
  }
  if (leftPriority < rightPriority) {
    return 1;
  }
  return 0;
};

const WalletPage: React.FC<Props> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance>(() => {
    const validBalances = balances.filter(checkIsInvalidBalance);
    const sortedBalances = validBalances.sort((lb, rb) =>
      sortBlockchain(lb.blockchain, rb.blockchain)
    );

    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [balances]);

  const rows = formattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={balance.blockchain}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
