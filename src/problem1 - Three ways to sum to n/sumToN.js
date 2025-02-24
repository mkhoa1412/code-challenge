function sum_to_n_1(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}

function sum_to_n_2(n) {
  return (n * (n + 1)) / 2;
}

function sum_to_n_3(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
}

console.log('1', sum_to_n_1(5))
console.log('2', sum_to_n_1(5))
console.log('3', sum_to_n_1(5))