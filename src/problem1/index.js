/* 
  #Task
  Provide 3 unique implementations of the following function in JavaScript.
  **Input**: `n` - any integer
  *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
  **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

/*
Assumptions:
- If n is negative, return result = 0
- If n is 0, return result = 0
- If n is float, it will be converted to integer
*/

// Implementation 1
// Using the formula for the sum of the first n natural numbers
var sum_to_n_a = function (n) {
  if (n <= 0) return 0; // if n is less than or equal to 0, return 0
  n = Math.floor(n); // if n is float will convert to integer
  return (n * (n + 1)) / 2;
}

// Implementation 2
// Using Iterative Approach
var sum_to_n_b = function (n) {
  if (n <= 0) return 0; // if n is less than or equal to 0, return 0
  n = Math.floor(n); // if n is float will convert to integer
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}


// Implementation 3
// Using a loop
var sum_to_n_c = function (n) {
  if (n <= 0) return 0; // if n is less than or equal to 0, return 0
  n = Math.floor(n); // if n is float will convert to integer
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}


// Test cases
// sum_to_n_a()
console.log(sum_to_n_a(-1)) // 0
console.log(sum_to_n_a(0)) // 0
console.log(sum_to_n_a(5.5)) // 15
console.log(sum_to_n_a(5)) // 15
// console.log(sum_to_n_a(Number.MAX_SAFE_INTEGER)) // very fast, result - 4.0564819207303336e+31

// sum_to_n_b()
console.log(sum_to_n_b(-1)) // 0
console.log(sum_to_n_b(0)) // 0
console.log(sum_to_n_b(5.5)) // 15
console.log(sum_to_n_b(5)) // 15
// console.log(sum_to_n_b(Number.MAX_SAFE_INTEGER)) // This will take an impractical amount of time and memory to complete.

// sum_to_n_c()
console.log(sum_to_n_c(-1)) // 0
console.log(sum_to_n_c(0)) // 0
console.log(sum_to_n_c(5.5)) // 15
console.log(sum_to_n_c(5)) // 15
// console.log(sum_to_n_c(Number.MAX_SAFE_INTEGER)) // This will take an impractical amount of time and memory to complete.
