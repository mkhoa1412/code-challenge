# Problem 3: Code Review and Refactoring

## Issues Identified

### 1. Type Safety Issues
- **Line 19**: `blockchain: any` - Using `any` defeats TypeScript's purpose
- **Line 39**: `lhsPriority` is undefined - should be `balancePriority`
- **Line 63**: Type mismatch - `sortedBalances` contains `WalletBalance` but typed as `FormattedWalletBalance`
- **Missing `blockchain` property** in `WalletBalance` interface (referenced on line 38)

### 2. Logic Errors
- **Lines 40-44**: Filtering logic is inverted - keeps balances with `amount <= 0` instead of `amount > 0`
- **Lines 48-52**: Missing return statement when priorities are equal (sort instability)
- **Line 38**: `balancePriority` computed but never used

### 3. Computational Inefficiencies
- **Lines 56-61**: `formattedBalances` is computed but never used (dead code)
- **Line 54**: `prices` in dependency array but not used in `sortedBalances` calculation
- **Line 63**: Using `sortedBalances` instead of `formattedBalances` for rows

### 4. React Anti-patterns
- **Line 68**: Using array `index` as React key (should use unique identifier)
- **Line 67**: `classes.row` is undefined
- **Line 71**: Accessing `balance.formatted` which doesn't exist on `WalletBalance`

### 5. Code Structure Issues
- **Lines 11-13**: Empty interface extending `BoxProps` could be simplified
- **Line 15**: `children` destructured but never used

## Key Improvements Made

1. **Fixed type safety** with proper `Blockchain` union type and interface updates
2. **Corrected filtering logic** to keep positive balances with valid priorities
3. **Eliminated dead code** by properly using `formattedBalances`
4. **Fixed dependency arrays** to only include actually used values
5. **Used proper React keys** with unique identifiers instead of array indices
6. **Simplified sort logic** with direct subtraction
7. **Added proper memoization** for the formatting step
8. **Fixed all undefined variable references**

## Performance Impact

The refactored code provides:
- Better type safety and developer experience
- Eliminated unnecessary computations
- Proper React rendering optimization
- More maintainable and readable code structure
