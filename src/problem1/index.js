//**Input**: `n` - any integer
//Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
//**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function(n) {
  const sum = (n * (n + 1)) / 2;
  return sum;
};

var sum_to_n_c = function(n) {
  const sum = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
  return sum;
};

console.log("sum_to_n_a(5):", sum_to_n_a(1000));
console.log("sum_to_n_b(5):", sum_to_n_b(1000)); 
console.log("sum_to_n_c(5):", sum_to_n_c(1000));