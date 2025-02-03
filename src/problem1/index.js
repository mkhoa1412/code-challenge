var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

// Test case
console.log("sum_to_n_a", sum_to_n_a(5));
console.log("sum_to_n_b", sum_to_n_b(5));
console.log("sum_to_n_c", sum_to_n_c(5));
console.log("sum_to_n_a 0", sum_to_n_a(0));
console.log("sum_to_n_b 0", sum_to_n_b(0));
console.log("sum_to_n_c 0", sum_to_n_c(0));
console.log("sum_to_n_a 1", sum_to_n_a(1));
console.log("sum_to_n_b 1", sum_to_n_b(1));
console.log("sum_to_n_c 1", sum_to_n_c(1));
// node src/problem1/index.js run this for output
