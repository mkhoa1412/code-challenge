import React from "react";

interface WalletRowProps {
  amount: number;
  formattedAmount: string;
  usdValue: number;
}

const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  formattedAmount,
  usdValue,
}) => {
  return (
    <div className="wallet-row">
      <span>Amount: {amount}</span>
      <span>Formatted Amount: {formattedAmount}</span>
      <span>USD Value: ${usdValue.toFixed(2)}</span>
    </div>
  );
};

export default WalletRow;
