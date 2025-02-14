## Computational Inefficiencies and Anti-patterns in the Code

### 1. Incorrect Filtering Logic in `sortedBalances`
- The condition inside the `filter` function is flawed:
  ```ts
  if (lhsPriority > -99) {
     if (balance.amount <= 0) {
       return true;
     }
  }
  ```
  - `lhsPriority` is not defined; it should be `balancePriority`.
  - The condition only retains balances where `amount <= 0`, which seems unintended.

### 2. Inefficient Sorting
- The sorting function directly calls `getPriority(lhs.blockchain)` and `getPriority(rhs.blockchain)`, leading to redundant computations.
- The sorting logic does not handle cases where priorities are equal, potentially causing unstable sorting.

### 3. Unnecessary Recalculation in `useMemo` Dependencies
- `useMemo` depends on `[balances, prices]`, but `prices` are not used in sorting, causing unnecessary recomputation.

### 4. Incorrectly Mapping Over `sortedBalances` for `formattedBalances`
- `toFixed()` is called without arguments, defaulting to `toFixed(0)`, removing decimal precision.

### 5. Incorrect Type in `rows` Mapping
- `rows` maps over `sortedBalances` (of type `WalletBalance`), but tries to use properties from `FormattedWalletBalance` (`formatted`).
- `formattedBalances` is created but never used in `rows`.

### 6. Potential Performance Issue in `rows` Key Assignment
- `index` is used as a key in `WalletRow`. If the list is reordered, unnecessary re-renders occur.
- A stable key (e.g., `currency`) should be used instead.

---

## Key Fixes and Improvements

### 1. Fixed Filtering Logic
- Retained only positive balances (`balance.amount > 0`).
- Corrected the incorrect variable (`lhsPriority → balancePriority`).

### 2. Optimized Sorting Logic
- Eliminated redundant calls to `getPriority()`.
- Used a single subtraction (`rightPriority - leftPriority`) for efficient sorting.

### 3. Removed Unnecessary Dependency (`prices`) from `useMemo`
- Since `prices` were not used in sorting, `useMemo` now only depends on `balances`.

### 4. Improved Number Formatting
- Used `toFixed(2)` instead of `toFixed()` to retain two decimal places.

### 5. Corrected Type Issue in `rows` Mapping
- `rows` now maps over `formattedBalances` instead of `sortedBalances`.

### 6. Used Stable Key for `WalletRow` Components
- `key={balance.currency}` ensures stable keys, preventing unnecessary re-renders.