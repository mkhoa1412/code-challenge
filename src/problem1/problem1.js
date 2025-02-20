// Task
// Provide 3 unique implementations of the following function in JavaScript.
// 
// **Input**: `n` - any integer
// 
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// 
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Using traditional for loop
var sum_to_n_a = function (n) {
  var sum = 0;

  for (var i = 0; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// Using recursion
var sum_to_n_b = function (n) {
  if (n <= 1) {
    return n;
  }

  return n + sum_to_n_b(n - 1);
};

// Using mathematical formula
var sum_to_n_c = function (n) {
  return n * (n + 1) / 2;
};

// Using array reduce
var sum_to_n_d = function (n) {
  return Array
    .from({ length: n }, (_, i) => i + 1)
    .reduce((prev, curr) => prev + curr, 0);
};