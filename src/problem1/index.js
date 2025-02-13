//Iterative Approach (Loop)
const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

//Tests
console.log(sum_to_n_a(5)); //15
console.log(sum_to_n_a(0)); //0
console.log(sum_to_n_a(-1)); //0

//Recursive Approach
const sum_to_n_b = (n) => {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_b(n - 1);
};

//Tests
console.log(sum_to_n_b(5)); //15
console.log(sum_to_n_b(0)); //0
console.log(sum_to_n_b(-1)); //0

//Mathematical Formula
const sum_to_n_c = (n) => {
  return (n * (n + 1)) / 2 || 0;
};

//Tests
console.log(sum_to_n_c(5)); //15
console.log(sum_to_n_c(0)); //0
console.log(sum_to_n_c(-1)); //0
