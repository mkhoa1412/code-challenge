# 99Tech Code Challenge - Problem #3 #
- Original Code: `messy-react/src/OriginalWalletPage.tsx`
- Refactored Code:
  + `messy-react/src/RefactoredWalletPage-1.tsx`
  + `messy-react/src/RefactoredWalletPage-2.tsx`

1. Usage of `.toFixed()`
    #### a. Issues:
    - May produce a string with unexpected decimal points.
    #### b. Solutions:
    - Set the specific precision as parameter to prevent the issue. Ex: `.toFixed(3)`
2. Usage of `useMemo` hook for Sorting
   #### a. Issues:
    - Issue 1: The `useMemo` hook depends on `balances` and `prices`, it makes the sorting more expensive
    - Issue 2 (but not really issue, just considering): The `useMemo` hook should only be used for expensive computations that benefit from memoization, implementing of Sorting within the `useMemo`is much complex.
   #### b. Solutions:
    - Solution for Issue 1:  it is better handled separately to clarify dependencies.
    - Solution for Issue 2: no need to use `useMemo` for the sorting, or make the sorting happen once after filtering
3. Type issues
    #### a. Issue:
    - Issue 1: define the parameter `blockchain` (`getPriority` method) as `any` type is not safety.
    - Issue 2: 
    #### b. Solutions:
4. Unnecessary Computation in Filtering

5. Logic Errors and Inefficient Filtering
   #### a. Issues:
   - Issue 1: The filtering in sortedBalances as error: `lhsPriority` is not defined
   - Issue 2: The filtering logic checks `balance.amount <= 0` every time, resulting in unnecessary computations for negative or zero balances. The sorting algorithm's execution will be slower because it processes all balances before filtering them.
   #### b. Solutions:
   - Issue 1: `lhsPriority` should probably be `balancePriority`.
6. Redundant Computation
   #### a. Issues:
   - The blockchain priority is retrieved multiple times for balances both in the filtering and mapping processes => add extra computational overhead because getPriority function is called more than necessary
   #### b. Solution:
   - Redundant calls have been avoided by caching values through filters and maps.
7. Usage of Key in Lists
   #### a. Issues:
   - Using index as the key prop could lead to problems when keys do not remain stable
   #### b. Solution:
   - It's better to use a unique identifier from the balance if available
