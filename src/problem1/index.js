// use the formula
var sum_to_n_a = function(n) {
  if(n <= 0) return 0;
  return (n *  (n + 1)) / 2;
};

// use recursion
var sum_to_n_b = function(n) {
  if(n <= 0) return 0;
  return n + sum_to_n_b(n - 1);
};
// sum of array from 1 to n
var sum_to_n_c = function(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(0));