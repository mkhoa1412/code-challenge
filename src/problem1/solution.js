var sum_to_n_a = function (n) {
  let sum = 0
  for (let index = 1; index <= n; index++) {
    sum = sum + index
  }
  return sum
};

var sum_to_n_b = function (n) {
  return Array.from({ length: n }, (_, k) => k + 1).reduce((prevValue, currentValue) => prevValue + currentValue)
};

var sum_to_n_c = function (n) {
  const arrayData = [...Array(n)].map((_, index) => index + 1)
  let sum = 0
  arrayData.forEach(element => {
    sum = sum + element
  });
  return sum
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))