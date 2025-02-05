import * as React from "react";

interface IWalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: number;
}

const WalletRow: React.FunctionComponent<IWalletRowProps> = ({
  className,
  amount,
  usdValue,
  formattedAmount,
}) => {
  return (
    <div className={className}>
      <span>amount: {amount}</span>
      <span>usdValue: {usdValue}</span>
      <span>formattedAmount: {formattedAmount}</span>
    </div>
  );
};

export default WalletRow;
