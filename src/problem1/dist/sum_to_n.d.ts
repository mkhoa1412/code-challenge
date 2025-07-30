/**
 * Approach 1: Mathematical Formula (Arithmetic Series)
 *
 * Uses the mathematical formula for arithmetic series: n * (n + 1) / 2
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
declare function sum_to_n_a(n: number): number;
/**
 * Approach 2: Iterative Loop
 *
 * Uses a simple for loop to accumulate the sum from 1 to n
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
declare function sum_to_n_b(n: number): number;
/**
 * Approach 3: Recursive
 *
 * Uses recursion to calculate the sum by breaking down the problem
 *
 * @param n - The upper bound integer (inclusive)
 * @returns The sum of integers from 1 to n
 */
declare function sum_to_n_c(n: number): number;
export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
