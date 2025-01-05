/**
 * Calculates the sum of the first `n` natural numbers.
 */

/**
 *
 * Using the formula:
 * S = (n * (n + 1)) / 2
 *
 * Complexity:
 * - Time Complexity: O(1) (constant time)
 * - Space Complexity: O(1) (constant space)
 *
 * @param {number} n - The number up to which the sum is calculated. Must be a non-negative integer.
 * @returns {number} The sum of the first `n` natural numbers.
 */
function sumToNA(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 *
 * Using the iterative approach:
 * This function iterates through all numbers from `1` to `n` and accumulates their sum.
 *
 * Complexity:
 * - Time Complexity: O(n) (linear time, iterates from 1 to n)
 * - Space Complexity: O(1) (constant space, only a single accumulator is used)
 *
 * @param {number} n - The number up to which the sum is calculated. Must be a non-negative integer.
 * @returns {number} The sum of the first `n` natural numbers.
 */
function sumToNB(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/**
 *
 * Using the bitwise operations:
 * This is equivalent to dividing by 2
 * But the bitwise right-shift operation (`>> 1`) can offer slight performance advantages in some systems.
 *
 * Complexity:
 * - Time Complexity: O(1) (constant time)
 * - Space Complexity: O(1) (constant space)
 *
 * @param {number} n - The number up to which the sum is calculated. Must be a non-negative integer.
 * @returns {number} The sum of the first `n` natural numbers.
 */
function sumToNC(n: number): number {
  return (n * (n + 1)) >> 1;
}

/**
 *
 * Using the recursive approach
 *
 * Complexity:
 * - Time Complexity: O(n) (linear time, `n` recursive calls)
 * - Space Complexity: O(n) (due to the recursion call stack)
 *
 * @param {number} n - The number up to which the sum is calculated. Must be a non-negative integer.
 * @returns {number} The sum of the first `n` natural numbers.
 */
function sumToND(n: number): number {
  if (n === 0) {
    return 0;
  }
  return n + sumToND(n - 1);
}

// ========== Test cases ==========
function runTests() {
  const testCases = [
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 5, expected: 15 },
    { input: 10, expected: 55 },
    { input: 100, expected: 5050 },
  ];

  const methods = [
    { name: "sumToNA", func: sumToNA },
    { name: "sumToNB", func: sumToNB },
    { name: "sumToNC", func: sumToNC },
    { name: "sumToND", func: sumToND },
  ];

  methods.forEach(({ name, func }) => {
    console.info(`Testing ${name}:`);
    testCases.forEach(({ input, expected }) => {
      const result = func(input);
      if (result === expected) {
        console.info(`  ✅ ${name}(${input}) = ${result}`);
      } else {
        console.error(
          `  ❌ ${name}(${input}) = ${result} (expected ${expected})`
        );
      }
    });
    console.info("");
  });
}

runTests();
