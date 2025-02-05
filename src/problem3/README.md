**Some inefficiencies and anti-patterns i found and refactored in the code block below:**

1. Update code splitting and create global `utils/constants.ts` and `utils/types.ts` config for easier maintenance.
2. Remove `BoxProps` that isn't defined `interface Props extends BoxProps`
3. Move function `getPriority` to `utills/helpers.ts`and refactor with well-defined constants.
4. Update interface `WalletBalance` and ensure `blockchain` is included and required.
5. Handle `sortedBalances` and `balances` value in the `useWalletBalances` hook.
6. Remove `FormattedWalletBalance` that doesn't needed, use `WalletBalance` only.
7. Remove `formattedBalances` that doesn't be used and create a common function `formatBalance` in `utils/helpers.ts` to round the input value.

   ```js
   export const formatBalance = (
     value: number,
     precision: number = PRESICION
   ): number => {
     const factor = Math.pow(10, precision);

     // Convert value to a string to handle large numbers accurately
     const bigValue = BigInt(Math.round(value * factor));
     const bigFactor = BigInt(factor);

     // Convert result back to a number
     return Number(bigValue) / Number(bigFactor);
   };
   ```

   ```js
   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
     return {
       ...balance,
       formatted: balance.amount.toFixed(),
     };
   });
   ```
