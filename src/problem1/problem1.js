// Additional function to check if the input is a positive integer since we only use javascript but not typescript
const isAnInteger = (n) => {
  if (typeof n !== "number") {
    console.log("Input must be a number");
    return false;
  }
  if (n < 0) {
    console.log("Input must be a positive number");
    return false;
  }
  return true;
};

// Math fomula
const sum_to_n_a = (n) => {
  if (!isAnInteger(n)) {
    throw Error("Input must be a positive integer");
  }
  return (n * (n + 1)) / 2;
};

// for loop
const sum_to_n_b = (n) => {
  if (!isAnInteger(n)) {
    throw Error("Input must be a positive integer");
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// recursion
const sum_to_n_c = (n) => {
  if (!isAnInteger(n)) {
    throw Error("Input must be a positive integer");
  }
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
// All of the sums should be 55
