/*
Input: n - any integer
Output: sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.
 */

// Using a Loop
var sum_to_n_a = function (n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};
console.log("Using a Loop:", sum_to_n_a(5)); //15

// Using the Mathematical Formula
var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};
console.log("Using the Mathematical Formula:", sum_to_n_b(5)); //15

// Using Recursion
var sum_to_n_c = function (n) {
    if (n === 0) return 0;
    return n + sum_to_n_c(n - 1);
};
console.log("Using Recursion:", sum_to_n_c(5)); //15
