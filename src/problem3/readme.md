# Messy React

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```

**To refactor the code in this file**, I first reviewed the component to understand its purpose. It is designed to **display a list of wallet balances (such as coins or tokens), sorted by blockchain priority and formatted with their corresponding USD values.**

Next, I will go through each block and line of code to review and improve them.

- **Firstly**, the `FormattedWalletBalance` type is based on `WalletBalance`. Instead of redefining shared fields, we can use **TypeScript’s intersection type** (`&`) to make the relationship explicit and avoid duplication:

  ```tsx
  interface WalletBalance {
    currency: string;
    amount: number;
  }

  type FormattedWalletBalance = WalletBalance & {
    formatted: string;
  };
  ```

- Next, consider the line `const { children, ...rest } = props;`. It seems the intention is to **prevent `children` from being rendered**, even if it's passed. However, instead of destructuring and ignoring `children`, it's clearer and safer to **prevent users from passing it altogether** by using TypeScript's `Omit` utility type.

  Additionally, the use of `BoxProps` is questionable here. Since the component renders a native `<div>` and spreads the props onto it, it would be more appropriate to use `HTMLProps<HTMLDivElement>` as the base type. This ensures proper typing for standard DOM props and avoids bringing in unnecessary styling or MUI-specific props.

  Here’s how to revise the `Props` definition:

  ```tsx
  // Revised version
  import { HTMLProps } from 'react';
  type Props = Omit<HTMLProps<HTMLDivElement>, 'children'>;

  const WalletPage: React.FC<Props> = (props) => {
  	....
    return <div {...props}>{rows}</div>;
  };

  ```

- Next, the component uses two hooks to retrieve the current wallet balances and the latest prices for each blockchain. These are essential to the component's functionality, so we will keep them as is.
- The `getPriority` function should be **moved outside of the component** since it does not rely on any local state or props. Additionally, instead of using `any` as the type for the `blockchain` parameter, we should define a proper `Blockchain` type to improve type safety.
- To improve the performance of `getPriority`, we can replace the `switch` statement with a **hash map** (i.e., a `Record`) for constant-time lookups. The `switch` statement has a worst-case time complexity of **O(n)**, as it must compare each case until a match is found. A hash map reduces this to **O(1)** in most cases, resulting in a cleaner and more efficient implementation.

  ```tsx
  type Blockchain = string;
  // Add blockchain to Balance
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: Blockchain;
  }
  const mapPriority: Record<Blockchain, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };

  const getPriority = (blockchain: Blockchain): number => {
    return mapPriority[blockchain] ?? -99;
  };
  const WalletPage: React.FC<Props> = (props) => {
  	...
  }
  ```

- Next, the logic for filtering out balances based on priority and amount (`amount <= 0`) should be refactored for better readability. The original code uses an unclear variable name (`lhsPriority`) and embeds the logic inline. Instead, we should:

  - Rename the variable for clarity (e.g., `balancePriority`)
  - Move the filtering logic into a **named helper function outside the component**

  ```tsx
  const checkIsInvalidBalance = (balance: WalletBalance) => {
  	const balancePriority = getPriority(balance.blockchain);
  	if (balancePriority > -99 && balance.amount <= 0) {
  	   return true
  	}
  	return false
  }
  ...
  balances.filter(checkIsInvalidBalance)
  ```

- The sorting logic is generally correct but lacks an explicit handling for the **equivalent priority case**. When two blockchains have the same priority, the current implementation does not ensure that their original order is preserved. Although JavaScript’s `.sort()` is stable in modern engines, it's good practice to **explicitly return `0`** to clarify that no reordering should happen.

  Additionally, the comparison logic should be **moved out of the component** and placed in a separate helper function for readability and reusability.

  ```tsx
  const sortBlockchain = (left: Blockchain, right: Blockchain) => {
  	const leftPriority = getPriority[left]
  	const rightPriority = getPriority[right]

  	if(leftPriority > rightPriority){
  		return -1
  	}
  	if(leftPriority < rightPriority){
  		return 1
  	}
  	return 0
  }

  ....sort((lb, rb) => sortBlockchain(lb.blockchain, rb.blockchain))
  ```

- Next, `sortedBalances` do not depend on `prices`, just remove it from dependency list, now `sortedBalances` become:

  ```tsx
  const sortedBalances = useMemo(() => {
    const validBalances = balances.filter(checkIsInvalidBalance);
    return validBalances.sort((lb, rb) =>
      sortBlockchain(lb.blockchain, rb.blockchain)
    );
  }, [balances]);
  ```

- Next, the `formattedBalances` variable currently serves no real purpose, as it is defined but never used elsewhere. Instead of keeping it as a separate step, we can **inline the formatting logic directly into the calculation of `sortedBalances`**.

  Furthermore, since the final result is not just sorted but also formatted, it would be clearer to **rename `sortedBalances` to `formattedBalances`**. This makes the variable name better reflect its actual content and purpose, improving code readability.

  ```tsx
  const formattedBalances = useMemo<FormattedWalletBalance>(() => {
    const validBalances = balances.filter(checkIsInvalidBalance);
    const sortedBalances = validBalances.sort((lb, rb) =>
      sortBlockchain(lb.blockchain, rb.blockchain)
    );

    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [balances]);
  ```

- Lastly, the `rows` variable is used to render the list of wallet balance components. However, there are a couple of issues to address:

  - The `classes` reference (e.g., `className={classes.row}`) is undefined in the current code, which would result in a runtime error. Since it's not used elsewhere or provided, it should simply be removed.
  - The `key` used in `.map()` is currently the array index, which is discouraged in React. Using `index` as a key can lead to rendering bugs and performance issues, especially when the order of items may change. Instead, it's better to use a **stable and unique identifier**. In this case, `blockchain` is a suitable choice **if each balance is guaranteed to have a unique blockchain.**

  ```tsx
  const rows = formattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={balance.blockchain}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });
  ```

**Now we have the code after modifying**

```tsx
import { HTMLProps } from "react";

type Blockchain = string;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

type FormattedWalletBalance = WalletBalance & {
  formatted: string;
};

type Props = Omit<HTMLProps<HTMLDivElement>, "children">;

const mapPriority: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number => {
  return mapPriority[blockchain] ?? -99;
};

const checkIsInvalidBalance = (balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (balancePriority > -99 && balance.amount <= 0) {
    return true;
  }
  return false;
};

const sortBlockchain = (left: Blockchain, right: Blockchain) => {
  const leftPriority = getPriority[left];
  const rightPriority = getPriority[right];

  if (leftPriority > rightPriority) {
    return -1;
  }
  if (leftPriority < rightPriority) {
    return 1;
  }
  return 0;
};

const WalletPage: React.FC<Props> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance>(() => {
    const validBalances = balances.filter(checkIsInvalidBalance);
    const sortedBalances = validBalances.sort((lb, rb) =>
      sortBlockchain(lb.blockchain, rb.blockchain)
    );

    return sortedBalances.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [balances]);

  const rows = formattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={balance.blockchain}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
```
