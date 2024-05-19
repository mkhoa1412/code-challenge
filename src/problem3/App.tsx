import React, { useMemo } from 'react';
import { useWalletBalances, usePrices } from './hooks'; // Import custom hooks
import WalletRow from './WalletRow'; // Import WalletRow component
import { BoxProps } from '@material-ui/core'; // Import BoxProps from Material-UI

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Add 'blockchain' property
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  
  // Fetch wallet balances and prices using custom hooks
  const balances = useWalletBalances();
  const prices = usePrices();

  // Function to get priority for a blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo': // Assume Zilliqa and Neo have the same priority
        return 20;
      default:
        return -99;
    }
  };

  // useMemo to filter and sort balances based on priority
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Filter out balances with priority less than -99 or amount <= 0
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Sort balances by priority in descending order
        return rightPriority - leftPriority;
      });
  }, [balances]);

  // Format balances with 'toFixed'
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // Map sorted and formatted balances to WalletRow components
  const rows = formattedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  // Return the WalletPage component
  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
