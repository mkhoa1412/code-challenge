/*
Complexity Analysis:
Time Complexity: 
O(n) → The function calls itself n times.
Space Complexity: 
O(n) → Each function call adds a frame to the call stack.
Efficiency:
Inefficient for large n due to recursive function call overhead.
Can cause stack overflow for large values of n (limited by recursion depth in JavaScript/TypeScript).
=> This is the recursive version of the sum_to_n problem.
*/

function sum_to_n_recursive(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_recursive(n - 1);
}