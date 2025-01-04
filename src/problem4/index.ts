// Iterative Approach
// Complexity:
// 	•	Time Complexity: O(n), as it iterates from 1 to n.
// 	•	Space Complexity: O(1), as it uses a single variable to store the sum.

// Efficiency:
// This approach is simple and straightforward but can become inefficient for large n due to the loop iteration.
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Mathematical Formula
// Complexity:
// 	•	Time Complexity: O(1), as it uses a constant-time formula.
// 	•	Space Complexity: O(1), as it requires no additional space.

// Efficiency:
// This is the most efficient implementation as it avoids iteration and computes the result in constant time. However, care should be taken with very large n values to avoid overflow.
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Recursive Approach
// Complexity:
// 	•	Time Complexity: O(n), as it performs n recursive calls.
// 	•	Space Complexity: O(n), due to the recursive call stack.

// Efficiency:
// This approach is less efficient compared to the others because of the overhead of recursive calls. It can lead to a stack overflow for large n if not optimized with techniques like tail recursion (not natively supported in TypeScript).
function sum_to_n_c(n: number): number {
  if (n <= 0) return 0;

  return n + sum_to_n_c(n - 1);
}
