import { useState } from "react";
import { Card, Typography } from "antd";
import useTokens from "../hooks/useTokens";
import TokenSelect from "./TokenSelect";
import AmountInput from "./AmountInput";
import SwapButton from "./SwapButton";
import ExchangeRateDisplay from "./ExchangeRateDisplay";

const { Title } = Typography;

const CurrencySwapForm = () => {
  const tokens = useTokens();
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount || amount <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const fromTokenPrice = tokens.find((token) => token.currency === fromToken).price;
      const toTokenPrice = tokens.find((token) => token.currency === toToken).price;
      const rate = (fromTokenPrice / toTokenPrice) * amount;
      setExchangeRate(rate);
    }, 1500);
  };

  return (
    <Card style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <Title level={3}>Currency Swap</Title>
      <TokenSelect tokens={tokens} value={fromToken} onChange={setFromToken} placeholder="From Token" />
      <TokenSelect tokens={tokens} value={toToken} onChange={setToToken} placeholder="To Token" />
      <AmountInput value={amount} onChange={setAmount} />
      <SwapButton onClick={handleSwap} loading={loading} />
      <ExchangeRateDisplay exchangeRate={exchangeRate} />
    </Card>
  );
};

export default CurrencySwapForm;
