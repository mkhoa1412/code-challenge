# Anti Parttern

## 1. Type Safety Issues 🚨

```
// Bad: Using 'any' type
const getPriority = (blockchain: any): number => {
  // ...
}

// Bad: Missing blockchain in interface
interface WalletBalance {
  currency: string;
  amount: number;
  // blockchain property missing
}
Issue : Loss of TypeScript benefits and type checking capabilities.
```

## 2. Logic Errors 🐛

```
// Bad: Incorrect filter logic
return balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) { // lhsPriority is undefined!
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false
})
Issue : Loss of TypeScript benefits and type checking capabilities.
```

## 3. Performance Issues ⚡

```
// Bad: Multiple iterations
const sortedBalances = useMemo(() => {
  return balances.filter(...).sort(...);
});

// Another iteration
const formattedBalances = sortedBalances.map(...);

// Yet another iteration
const rows = sortedBalances.map(...);
Issue : Multiple unnecessary array iterations reducing performance.

```

## 4. React Anti-patterns 🔧

```

// Bad: Using index as key
{rows.map((balance, index) => (
  <WalletRow
    key={index}
    // ...
  />
))}
Issue : Using array index as key can cause rendering issues.

```

# Refactored Solution

## 1. Proper Type Definitions

```
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
currency: string;
amount: number;
blockchain: Blockchain;
}
```

## 2. Constants for Priority

```
const BLOCKCHAIN_PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;
```

## 3. Optimized Data Processing

```
const formattedBalances = useMemo(() => {
  return balances
    .filter(balance => balance.amount > 0)
    .sort((a, b) => {
      const priorityA = getPriority(a.blockchain);
      const priorityB = getPriority(b.blockchain);
      return priorityB - priorityA || a.currency.localeCompare(b.currency);
    })
    .map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
      usdValue: prices[balance.currency] * balance.amount
    }));
}, [balances, prices]);
```

## 4. Proper Component Rendering

```
return (
  <div className={className} {...rest}>
    {formattedBalances.map((balance) => (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`}
        className={styles.row}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ))}
  </div>
);

```
