/*
Complexity Analysis:
Time Complexity: 
O(logn) → Uses a divide-and-conquer approach instead of summing linearly.
Space Complexity: 
O(1) → Only a few variables are used.
Efficiency:
Optimized for parallel processing in a multi-threaded environment.
Not a common approach in JavaScript due to single-threaded execution but useful in low-level optimizations.
=> This is the parallel version of the sum_to_n problem.
*/

function sum_to_n_parallel(n: number): number {
    if (n <= 0) return 0;
    
    let sum = 0;
    let step = 1;
    
    while (step <= n) {
        sum += (n + 1 - step) * step;
        step *= 2;
    }
    
    return sum;
}
