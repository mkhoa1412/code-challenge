/**
 * Complexity: O(n)
 * Explanation:
 * - This function iterates from 1 to `num` using a `for` loop.
 * - It initializes `sum` as 0.
 * - The loop runs from `1` to `num` (inclusive), adding each number to `sum`.
 * - Since the loop executes `n` iterations, the time complexity is **O(n)**.
 * - Space complexity is **O(1)** because it only uses a few extra variables.
 */
const sum_to_n_a = (num: number): number => {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i; // Add each number from 1 to `num`
  }
  return sum;
};

console.log("Result of sum_to_n_a(10):", sum_to_n_a(10));
console.log(`
Function: sum_to_n_a
- Complexity: O(n)
- Explanation:
  - Iterates from 1 to num using a loop.
  - Each iteration adds the current number to sum.
  - Runs 'n' iterations, so complexity is O(n).
  - Space complexity is O(1) since it uses only a few variables.
`);

/**
 * Complexity: O(n/2) ≈ O(n)
 * Explanation:
 * - Instead of summing all numbers sequentially, this function pairs numbers:
 *   (1, num), (2, num-1), (3, num-2), and so on.
 * - It adds the first and last numbers in each iteration.
 * - The loop runs until `start` and `end` meet in the middle.
 * - The number of iterations is approximately `n/2`, but in Big-O notation, we drop constants, so it's still **O(n)**.
 * - Space complexity remains **O(1)** since it only uses a few variables.
 */
const sum_to_n_b = (num: number): number => {
  let sum = 0;
  let start = 1;
  let end = num;
  while (start <= end - 1 || start === end) {
    if (start === end) {
      sum += start;
      return sum;
    }
    sum += start + end;
    start++;
    end--;
  }

  return sum;
};

console.log("Result of sum_to_n_b(10):", sum_to_n_b(10));
console.log(`
Function: sum_to_n_b
- Complexity: O(n)
- Explanation:
  - Pairs numbers (1, num), (2, num-1), etc.
  - Adds first and last numbers in each iteration.
  - Runs approximately n/2 times, but we drop constants in Big-O.
  - Space complexity is O(1).
`);

/**
 * Complexity: O(1)
 * Explanation:
 * - Uses the mathematical formula for summing the first `n` natural numbers:
 *   Sum = (n * (n + 1)) / 2
 * - This formula computes the sum in **constant time**, regardless of the value of `n`.
 * - There are **no loops or recursive calls**, meaning the number of operations does not depend on `n`.
 * - The space complexity is also **O(1)** because it only uses a single return statement with no extra storage.
 */
const sum_to_n_c = (num: number): number => {
  return (num * (num + 1)) / 2; // Direct formula
};

console.log("Result of sum_to_n_c(10):", sum_to_n_c(10));
console.log(`
Function: sum_to_n_c
- Complexity: O(1)
- Explanation:
  - Uses the formula (n * (n + 1)) / 2.
  - Computes the sum instantly in constant time.
  - No loops or recursion.
  - Best method with O(1) complexity.
`);
