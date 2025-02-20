- **Redundant typing**: `FormattedWalletBalance` contains field from `WalletBalance`. This can be solved by `FormattedWalletBalance` extending `WalletBalance`:
```tsx
interface WalletBalance {
    currency: string;
    amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}
```

- **Redundant typing**: `WalletPage`'s `Props` is annotated twice in the function signature. Instead, we can opt out annotating it from the function argument if we're using `FC`:
```tsx
const WalletPage: React.FC<Props> = (props) => {
  //...
}
```

- **Redundant typing**: `Props` extends `BoxProps`, however `Props` itself does not have any unique fields. To solve this, either remove `Props` altogether and directly use it in our component, or alias `Props` to `BoxProps`.
```tsx
const WalletPage: React.FC<BoxProps> = (props) => {
  //...
}
```

- **(Anti-pattern) using `any` unnecessarily**: `getPriority`'s `blockchain` parameter is typed using `any`. By inferring through its implementation, we can constraint it further by using the `string` type instead:
```tsx
const getPriority = (blockchain: string): number => {
  // ...
}
```

- **Code inefficiencies**: `getPriority` is implemented within the `WalletPage` component, even though it doesn't have direct dependencies to it. To improve performance by preventing it to be re-created at every re-render, we can move out its implementation outside `WalletPage` instead. 

- `getPriority` is implemented using `switch` statement. While this is okay, a more readable approach is to refactor it using object literal and access it by object key:
```tsx
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number =>
  BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
```

- **(Anti-pattern) Unnecessary nested if + verbose boolean**: While filtering `balances` inside `sortedBalances`' `useMemo`, there are instances of unnecessary if statements and verbose boolean that can be collapsed from:
```tsx
balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
      if (balance.amount <= 0) {
        return true;
      }
  }
  return false
})
```
to
```tsx
balances.filter((balance) => {
  return getPriority(balance.blockchain) > -99 && balance.amount > 0;
})
```

- (Code bug): continuing previous code, `getPriority`'s result was stored into `balancePriority`, however it wasn't used anywhere and instead an undeclared `lhsPriority` was used.

- (Code bug): continuing previous code, `balance.amount` was tested against less than equal to `0`. Unless we're allowing for negative balances, this should be greater than instead.

- **Unnecessary if statement**: While sorting filtered `balances` inside `sortedBalances`' `useMemo`, we can just return the delta between `getPriority`'s `rhs` and `lhs` as `sort` only care about the positive and negative of the value:
```tsx
balances.sort((lhs, rhs) => {
  return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
})
```

- (Code bug): `formattedBalances` is unused. However, by inferring its surrounding code, the mapping function it used should be reused for `sortedBalances` as `rows` (the next code block) does uses the `formatted` field it mapped over:
```tsx
balances.map((balance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(2),
  };
})
```

- **Code inefficiencies**: `sortedBalances`' `useMemo` depends on `prices`, which is actually not used anywhere inside it. Instead, it's best to remove it from the dependency array.

- **(Anti-pattern) using index as element key**: when `sortedBalances` is mapped to get `WalletRow` component, its indexes are used for `WalletRow` key. Instead, we can construct a unique key using fields from `balance`.