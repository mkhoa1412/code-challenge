## Interface refactor
- add blockchain field
- Define BoxProps interface
- Remove FormattedWalletBalance interface

## Remove unused code
- variable formattedBalances: Instead of creating a separate formattedBalances array, we can integrate the formatting directly within the mapping function that generates the WalletRow components


## getPriority function
- blockchain should have string type instead of any
- Should move getPriority outside WalletPage component to avoid render, clarify and maintainability

## sortedBalances function
- remove prices in dependencies paramaters because we do not using it in this function
- remove if condition in filter function, change lhsPriority to balancePriority
- remove if (leftPriority > rightPriority) condition
- Move to outside WalletPage to improve performance, clarify and maintainability
