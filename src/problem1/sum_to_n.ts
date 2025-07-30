// Type declaration for Node.js module system
declare const module: any;

/**
 * Approach 1: Mathematical Formula (Arithmetic Series)
 *
 * Uses the mathematical formula for arithmetic series: n * (n + 1) / 2
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
function sum_to_n_a(n: number): number {
    // Handle edge cases
    if (n < 0) return 0;
    if (n === 0) return 0;

    return (n * (n + 1)) / 2;
}

/**
 * Approach 2: Iterative Loop
 *
 * Uses a simple for loop to accumulate the sum from 1 to n
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
function sum_to_n_b(n: number): number {
  // Handle edge cases
  if (n < 0) return 0;
  if (n === 0) return 0;

 let sum: number = 0;

 for (let i: number = 1; i <= n; i++) {
     sum += i;
 }

 return sum;
}

/**
 * Approach 3: Recursive
 *
 * Uses recursion to calculate the sum by breaking down the problem
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
function sum_to_n_c(n: number): number {
  // Base cases
  if (n < 0) return 0;
  if (n === 0) return 0;
  if (n === 1) return 1;

  return n + sum_to_n_c(n - 1);
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sum_to_n_a,
        sum_to_n_b,
        sum_to_n_c
    };
}

// Export for ES6 modules
export {
    sum_to_n_a,
    sum_to_n_b,
    sum_to_n_c
};