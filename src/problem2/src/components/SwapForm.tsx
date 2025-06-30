import { useEffect, useState } from "react";
import { Card } from "@components/Card";
import { useTokenStore } from "@/store/tokenStore";
import type { TokenInfo } from "@/types";
import TokenSelector from "@/components/TokenSelector";
import { Icon } from "@iconify/react";

export default function SwapForm() {
  const { tokens, fetchTokens, loading } = useTokenStore();

  const [fromToken, setFromToken] = useState<TokenInfo | null>(null);
  const [toToken, setToToken] = useState<TokenInfo | null>(null);
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("0");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (!fromToken || !toToken) return;

    const rate = toToken.price / fromToken.price;
    setExchangeRate(rate);

    const calculated = parseFloat(fromAmount) * rate;
    setToAmount(calculated.toFixed(6));
  }, [fromToken, toToken, fromAmount]);

  const handleSwapTokens = () => {
    if (!fromToken || !toToken) return;
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSubmit = async () => {
    if (!fromToken || !toToken) {
      setError("Please select both tokens.");
      return;
    }

    if (parseFloat(fromAmount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert("Swap submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-4 text-white">
      <Card className="bg-[#1E1F2F] rounded-2xl shadow-xl">
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-black">Swap</h2>

          {/* FROM Token */}
          <TokenSelector
            value={fromToken}
            onChange={setFromToken}
            tokens={tokens}
            placeholder="From token"
          />
          <input
            className="bg-transparent text-right w-full outline-none text-2xl font-bold text-black"
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />

          {/* Swap Icon */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="bg-[#2A2C3D] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#3B3D4E] transition"
              title="Swap tokens"
            >
              <Icon
                icon="mdi:swap-vertical"
                className="text-gray-400 text-xl"
              />
            </button>
          </div>

          {/* TO Token */}
          <TokenSelector
            value={toToken}
            onChange={setToToken}
            tokens={tokens}
            placeholder="To token"
          />
          <div className="text-2xl font-bold text-right text-black">{toAmount}</div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>
          )}

          {/* Rate and Fee */}
          <div className="text-xs text-gray-500 mt-2">
            {fromToken && toToken ? (
              <p>
                1 {fromToken.currency} = {exchangeRate.toFixed(6)}{" "}
                {toToken.currency}
              </p>
            ) : (
              <p>Select both tokens to see exchange rate</p>
            )}
            <p>FEE: --</p>
          </div>

          {/* Swap Button */}
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`w-full text-white font-semibold py-2 rounded-xl mt-4 transition
              ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90"
              }`}
          >
            {isSubmitting ? "Swapping..." : "Swap"}
          </button>
        </div>
      </Card>
    </div>
  );
}
