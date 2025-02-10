# Code Challenge
# Problem3
# Issue
```bash
Undefined lhsPriority in filter logic
Unused prices in useMemo dependency
Missing case in sorting logic
Redundant formattedBalances map
Type mismatch in rows.map()
Redundant currency value calculation
Undefined BoxProps in Props
key uses index (edited) 5:33
```

# Fix
```bash
Used balancePriority instead
Removed prices dependency
Added return 0 for equal priority
Integrated formatting inside useMemo
Ensured sortedBalances is correctly typed
Moved usdValue calculation into useMemo
Removed or imported BoxProps
Used balance.currency as a unique key
```