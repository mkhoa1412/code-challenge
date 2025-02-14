import { useState } from "react";
import { Card, Typography, Alert } from "antd";
import useTokens from "../hooks/useTokens";
import TokenSelect from "./TokenSelect";
import AmountInput from "./AmountInput";
import SwapButton from "./SwapButton";
import ExchangeRateDisplay from "./ExchangeRateDisplay";
import { validateFields } from "../utils/validation";

const { Title } = Typography;

const CurrencySwapForm = () => {
  const tokens = useTokens();
  const [fromToken, setFromToken] = useState(null);
  const [toToken, setToToken] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [errors, setErrors] = useState({
    fromToken: "",
    toToken: "",
    amount: "",
  });

  const handleSwap = () => {
    const newErrors = validateFields(fromToken, toToken, amount);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

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
      {errors.fromToken && <Alert message={errors.fromToken} type="error" showIcon style={{ marginBottom: 10 }} />}
      <TokenSelect tokens={tokens} value={fromToken} onChange={setFromToken} placeholder="From Token" />
      {errors.toToken && <Alert message={errors.toToken} type="error" showIcon style={{ marginBottom: 10 }} />}
      <TokenSelect tokens={tokens} value={toToken} onChange={setToToken} placeholder="To Token" />
      {errors.amount && <Alert message={errors.amount} type="error" showIcon style={{ marginBottom: 10 }} />}
      <AmountInput value={amount} onChange={setAmount} />
      <SwapButton onClick={handleSwap} loading={loading} />
      <ExchangeRateDisplay exchangeRate={exchangeRate} />
    </Card>
  );
};

export default CurrencySwapForm;
