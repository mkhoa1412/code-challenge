import { Box, Button, Typography } from "@mui/material";
import { FC, memo } from "react";
import TokenInput from "~/components/TokenInput";
import useSwapForm from "~/hooks/useSwapForm";

const SwapForm: FC = () => {
  const {
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
  } = useSwapForm();

  if (isLoading || tokens.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          my: "31px",
        }}
      >
        <Typography component="h5">Swap</Typography>
        <TokenInput
          label="Amount to send"
          value={tokenInputAmount.sourceAmount}
          token={swapTokenValue.sourceToken}
          currencyTokens={tokens}
          onChange={handleOnChangeSendAmount}
          onChangeToken={handleSelectSendToken}
        />
        <TokenInput
          label="Amount to receive"
          value={tokenInputAmount.targetAmount}
          token={swapTokenValue.targetToken}
          currencyTokens={tokens}
          onChange={handleOnChangeReceiveAmount}
          onChangeToken={handleSelectReceiveToken}
        />
        <Button
          size="large"
          variant="contained"
          disabled={isDisabledSwapButton}
          onClick={handleSwap}
        >
          CONFIRM SWAP
        </Button>
      </Box>
    </Box>
  );
};

export default memo(SwapForm);
