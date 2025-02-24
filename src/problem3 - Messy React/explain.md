# **Issues and Suggested Improvements**

## **1. Line 19: Avoid Using `any`**
- The `blockchain` parameter in `getPriority` should have a proper type instead of `any`.  
- Define a specific type for blockchain values or infer it from existing data structures.  

---

## **2. Line 36: Avoid Using `useMemo`**
- **Personal Perspective:** `useMemo` and `useCallback` make code harder to read and maintain.  
- **Thought Process:** If `useMemo` or `useCallback` is required, it often indicates an underlying bad pattern causing unnecessary re-renders.  

---

## **3. Issues in `sortedBalances` Function**
- **Unused Dependency:** `prices` is included in dependencies but not used inside `useMemo`.  
- **Undefined Variable:** `lhsPriority` is not declared; should be replaced with `balancePriority`.  
- **Condition Simplification:** Instead of checking two separate conditions, merge them into a single condition.  
- **Missing Property:** `blockchain` is not defined in the `WalletBalance` interface.  
- **Sorting Function Issue:** The second `sort` function lacks a `return 0` case for equal priorities.  

---

## **4. Line 56: Unused `formattedBalances` Variable**
- The `formattedBalances` variable is declared but never used. Remove it if not needed.  

---

## **5. Line 63: Declaring a Component Inside Another Component**
- **Bad Pattern:** Declaring a component inside `WalletPage` causes `rows` to unmount and remount on every re-render.  
- **Impact:** This wastes resources and increases render time.  
- **Solution:** Move the component or function out of `WalletPage`, or use it directly in the JSX.  
