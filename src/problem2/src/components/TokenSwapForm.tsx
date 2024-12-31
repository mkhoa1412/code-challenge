import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import TokenSelector from "./TokenSelector";
import Loader from "./Loader";
import { fetchTokenPrices, Token } from "../utils/api";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const calculateExchangeRate = (from: Token, to: Token, amount: string) => {
  if (from && to) {
    const fromPrice = from?.price;
    const toPrice = to?.price;
    if (fromPrice && toPrice) {
      return (Number(amount) * fromPrice) / toPrice;
    }
  }
  return 0;
};
const TokenSwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToTokem] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");

  const [toAmount, setToAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [submiting, setSubmiting] = useState<boolean>(false);

  useEffect(() => {
    const getPrices = async () => {
      const data = await fetchTokenPrices();

      setTokens(data);
      setLoading(false);
    };

    getPrices();
  }, []);
  const updateToAmount = useCallback(
    (fromAmount: string, fromToken: Token | null,toToken: Token | null) => {
     
      if (
        !isNaN(Number(fromAmount)) &&
        Number(fromAmount) > 0 &&
        fromToken &&
        toToken
      )
        setToAmount(
          String(calculateExchangeRate(fromToken, toToken, fromAmount))
        );
    },
    []
  );
  const updateFromAmount = useCallback(
    (toAmount: string) => {
      if (fromToken && toToken)
        setFromAmount(
          !isNaN(Number(toAmount)) && Number(toAmount) > 0
            ? String(calculateExchangeRate(toToken, fromToken, toAmount))
            : ""
        );
    },
    [fromToken, toToken]
  );

  const onFromTokenChange = useCallback(
    (token: Token) => {
      setFromToken(token);
      updateToAmount(fromAmount, token,toToken);
    },
    [fromAmount, toToken, updateToAmount]
  );

  const onToTokenChange = useCallback(
    (token: Token) => {
      setToTokem(token);
      updateToAmount(fromAmount, fromToken,token);
    },
    [fromAmount, fromToken, updateToAmount]
  );
  const handleFromAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFromAmount(value);
      updateToAmount(value, fromToken,toToken);
    },
    [fromToken, toToken, updateToAmount]
  );

  const handleToAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setToAmount(value);
      updateFromAmount(value);
    },
    [updateFromAmount]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!fromToken || !toToken || !fromAmount) {
        toast.error("Please fill all fields correctly");
        return;
      }
      if (
        isNaN(Number(fromAmount)) ||
        Number(fromAmount) <= 0 ||
        isNaN(Number(toAmount)) ||
        Number(toAmount) <= 0
      ) {
        toast.error("Please enter a valid amount");
        return;
      }
      setSubmiting(true)
      toast.success(
        `Swapping ${fromAmount} from ${fromToken.currency} to ${toToken.currency}`
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setSubmiting(false)
      toast.success(`Done.`);
    },
    [fromAmount, fromToken, toAmount, toToken]
  );

  return (
    <div className=" mt-8 flex flex-col w-full items-center">
      {loading ? (
        <Loader />
      ) : (
        <Card className=" w-2/4">
          <CardHeader>
            <h1 className="text-xl font-bold">Token Swap Form</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className=" flex flex-col">
              <label className="text-md mt-4">From</label>
              <TokenSelector
                tokens={tokens}
                selectedToken={fromToken}
                onSelectToken={onFromTokenChange}
              />

              <label className="text-md mt-4">Amount</label>
              <Input value={fromAmount} onChange={handleFromAmountChange} />
              <label className="text-md mt-4">To</label>
              <TokenSelector
                tokens={tokens}
                selectedToken={toToken}
                onSelectToken={onToTokenChange}
              />

              <label className="text-md mt-4">Amount</label>
              <Input value={toAmount} onChange={handleToAmountChange} />
              {submiting ? (
                <Button disabled className=" mt-4">
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className=" mt-4">
                  Swap
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TokenSwapForm;
