// Solution A: Iterative Loop Method
const sum_to_n_a = (n) => {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Solution B: Recursive Method
const sum_to_n_b = (n) => {
  if (n <= 0) return 0;
  return n + sum_to_n_b(n - 1);
};

// Solution C: Math Formula using BigInt
const sum_to_n_c = (n) => {
  if (n <= 0) return 0n;
  const bigN = BigInt(n);
  return (bigN * (bigN + 1n)) / 2n;
};

// Test cases
console.log("sum_to_n_a(5): ", sum_to_n_a(5));                           // Output: 15
console.log("sum_to_n_b(25): ", sum_to_n_b(25));                         // Output: 325
console.log("sum_to_n_c(50000000000000): ", sum_to_n_c(5)); // Output: 1250000000000025000000000000n

