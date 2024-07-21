// Using a loop
var sum_to_n_a = function(n: number) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
};

// Using recursion
var sum_to_n_b = function(n: number) {
  if (n <= 1) {
      return n;
  }
  return n + sum_to_n_b(n - 1);
};

// Using math functions
var sum_to_n_c = function(n: number) {
  return (n * (n + 1)) / 2;
};