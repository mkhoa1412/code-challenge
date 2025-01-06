// Iterative approach: Uses a for loop to calculate the sum of integers from 1 to n
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Mathematical formula approach: Uses the arithmetic series sum formula: (n * (n + 1)) / 2
var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

// Recursive approach: Uses recursion to calculate the sum of integers from 1 to n
// This solution is unsafe with stack overflow when the input n is too large
// In case optimize we should use the Tail-call optimization
var sum_to_n_c = function (n) {
  if (n <= 1) {
    return n;
  }

  return n + sum_to_n_c(n - 1);
};

console.log("sum_to_n_a: ", sum_to_n_a(100));
console.log("sum_to_n_b: ", sum_to_n_b(100));
console.log("sum_to_n_c: ", sum_to_n_c(100));
