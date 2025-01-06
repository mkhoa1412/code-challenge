import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import useGetTokesPrice from "~/hooks/useGetTokensPrice";
import { DIGIT_ONLY_REG } from "~/constants";

type Token = {
  sourceToken: string;
  targetToken: string;
};
type TokenAmount = {
  sourceAmount: string;
  targetAmount: string;
};

const useSwapForm = () => {
  const [tokenInputAmount, setSwapAmountInputValue] = useState<TokenAmount>({
    sourceAmount: "",
    targetAmount: "",
  });
  const [swapTokenValue, setSwapTokenValue] = useState<Token>({
    sourceToken: "",
    targetToken: "",
  });

  const { tokens, isLoading } = useGetTokesPrice();

  useEffect(() => {
    if (tokens.length) {
      setSwapTokenValue({
        sourceToken: tokens?.[0]?.currency,
        targetToken: tokens?.[1]?.currency,
      });
    }
  }, [tokens]);

  const handleConvertToken = useCallback(
    (token: Token, amount: number, isSourceFirstPair: boolean) => {
      if (token.sourceToken === token.targetToken) {
        return amount;
      } else {
        const swapRate =
          Number(
            tokens?.filter((item) => item.currency === token.sourceToken)[0]
              .price
          ) /
          Number(
            tokens?.filter((item) => item.currency === token.targetToken)[0]
              .price
          );

        return isSourceFirstPair ? amount * swapRate : amount / swapRate;
      }
    },
    [tokens]
  );

  const handleOnChangeSendAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const sourceAmount = event.target.value.replace(DIGIT_ONLY_REG, "");
      const targetAmount = handleConvertToken(
        swapTokenValue,
        Number(sourceAmount),
        true
      );
      setSwapAmountInputValue({
        sourceAmount,
        targetAmount: targetAmount.toString(),
      });
    },
    [handleConvertToken, swapTokenValue]
  );

  const handleOnChangeReceiveAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetAmount = event.target.value.replace(DIGIT_ONLY_REG, "");
      const sourceAmount = handleConvertToken(
        swapTokenValue,
        Number(targetAmount),
        false
      );
      setSwapAmountInputValue({
        targetAmount,
        sourceAmount: sourceAmount.toString(),
      });
    },
    [handleConvertToken, swapTokenValue]
  );

  const handleSelectSendToken = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const sourceToken = event.target.value;
      setSwapTokenValue({
        ...swapTokenValue,
        sourceToken,
      });

      setSwapAmountInputValue({
        sourceAmount: "",
        targetAmount: "",
      });
    },
    [swapTokenValue]
  );

  const handleSelectReceiveToken = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetToken = event.target.value;
      const targetAmount = handleConvertToken(
        { ...swapTokenValue, targetToken },
        Number(tokenInputAmount.sourceAmount),
        true
      );
      setSwapTokenValue({
        ...swapTokenValue,
        targetToken,
      });
      setSwapAmountInputValue({
        ...tokenInputAmount,
        targetAmount: targetAmount.toString(),
      });
    },
    [handleConvertToken, swapTokenValue, tokenInputAmount]
  );

  const isInvalidSendAmount = useMemo(
    () => Number(tokenInputAmount.sourceAmount) > Number.MAX_SAFE_INTEGER,
    [tokenInputAmount.sourceAmount]
  );
  const isInvalidReceiveAmount = useMemo(
    () => Number(tokenInputAmount.targetAmount) > Number.MAX_SAFE_INTEGER,
    [tokenInputAmount.targetAmount]
  );
  const isDisabledSwapButton = useMemo(
    () =>
      isNaN(Number(tokenInputAmount.sourceAmount)) ||
      isNaN(Number(tokenInputAmount.targetAmount)) ||
      Number(tokenInputAmount.sourceAmount) === 0 ||
      Number(tokenInputAmount.targetAmount) === 0 ||
      isInvalidSendAmount ||
      isInvalidReceiveAmount,
    [
      tokenInputAmount.sourceAmount,
      tokenInputAmount.targetAmount,
      isInvalidSendAmount,
      isInvalidReceiveAmount,
    ]
  );

  const handleSwap = useCallback(() => {
    alert("Swap token successfully!");
  }, []);

  return {
    tokenInputAmount,
    swapTokenValue,
    tokens,
    isLoading,
    isDisabledSwapButton,
    handleOnChangeSendAmount,
    handleOnChangeReceiveAmount,
    handleSelectSendToken,
    handleSelectReceiveToken,
    handleSwap,
  };
};

export default useSwapForm;
