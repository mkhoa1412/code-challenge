// iteration, O(n) and it's simple
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Basically math, fastest and most effient
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}

// recursion but it has side-effect
const memo = {};
function sum_to_n_c(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];

  memo[n] = n + sum_to_n_c(n - 1, memo);
  return memo[n];
}

// just the tests
// if (![sum_to_n_a(5), sum_to_n_b(5), sum_to_n_c(5)].every((x) => x === 15)) {
//   throw new Error('???');
// }
