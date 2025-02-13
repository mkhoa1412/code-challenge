/*
Complexity Analysis:
Time Complexity:
O(1) → Uses a constant-time formula.
Space Complexity: 
O(1) → Only uses a few variables.
Efficiency:
Extremely efficient since it avoids iteration.
Relies on arithmetic, which is optimized at the CPU level.
May cause integer overflow for very large values of n (but this is mitigated by the problem constraints).
=> This is the formula-based version of the sum_to_n problem.
*/

function sum_to_n_formula(n: number): number {
    return (n * (n + 1)) / 2;
}
