// Method A: Iterative Approach
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}
// Linear, as it iterates from 1 to n.
// Constant, as only a few variables are used.


// Method B: Mathematical Formula
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}
// Constant, as it uses a direct formula.
// Constant, as no additional memory is required.


// Method C: Recursive Approach
function sum_to_n_c(n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
}
// Linear, as it makes n recursive calls.
// Linear, due to the call stack created by recursion.
