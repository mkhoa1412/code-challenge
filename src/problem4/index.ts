// Iterative approach (O(n))
export const sum_to_n_a = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Mathematical formula approach (O(1))
export const sum_to_n_b = (n: number): number => {
  return (n * (n + 1)) / 2;
};

// Recursive approach (O(n))
export const sum_to_n_c = (n: number): number => {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};

// Complexity analysis:
// sum_to_n_a: O(n) - Iterates from 1 to n, summing each value.
// sum_to_n_b: O(1) - Uses a constant-time mathematical formula.
// sum_to_n_c: O(n) - Recursively calls itself n times, leading to stack overhead.
