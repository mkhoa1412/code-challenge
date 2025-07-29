/**
 * Approach 1: Mathematical Formula (Arithmetic Series)
 *
 * Uses the mathematical formula for arithmetic series: n * (n + 1) / 2
 *
 * @param {number} n - The upper bound integer (inclusive)
 * @returns {number} The sum of integers from 1 to n
 */
function sum_to_n_a(n) {
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
 * @param {number} n - The upper bound integer (inclusive)
 * @returns {number} The sum of integers from 1 to n
 */
function sum_to_n_b(n) {
  // Handle edge cases
  if (n < 0) return 0;
  if (n === 0) return 0;

 let sum = 0;

 for (let i = 1; i <= n; i++) {
     sum += i;
 }

 return sum;
}

/**
 * Approach 3: Recursive
 *
 * Uses recursion to calculate the sum by breaking down the problem
 *
 * @param {number} n - The upper bound integer (inclusive)
 * @returns {number} The sum of integers from 1 to n
 */
function sum_to_n_c(n) {
  // Base cases
  if (n < 0) return 0;
  if (n === 0) return 0;
  if (n === 1) return 1;

  return n + sum_to_n_c(n - 1);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sum_to_n_a,
        sum_to_n_b,
        sum_to_n_c
    };
}
