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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sum_to_n_a
    };
}