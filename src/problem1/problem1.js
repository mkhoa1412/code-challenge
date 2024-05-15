// Using for loop
function sum_to_n_a(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Using mathematical formulas
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2
}

// using recursion
function sum_to_n_c(n) {
  if (n <= 1) {
    return n
  }
  return n + sum_to_n(n - 1)
}