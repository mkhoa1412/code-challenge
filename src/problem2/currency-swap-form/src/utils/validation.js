export const validateFields = (fromToken, toToken, amount) => {
  return {
    fromToken: fromToken ? "" : "From Token is required.",
    toToken: toToken ? "" : "To Token is required.",
    amount: amount && amount > 0 ? "" : "Amount is required and must be greater than 0."
  };
};
