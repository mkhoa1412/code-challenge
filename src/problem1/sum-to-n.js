const sumToNSolution1 = (n) => {
  if (n < 1) {
    return 0;
  }
  return n + sumToNSolution1(n - 1);
};

const sumToNSolution2 = (n) => {
  return (n * (n + 1)) / 2;
};

const sumToNSolution3 = (n) => {
  return (n ** 2 + n) / 2;
};

console.log(sumToNSolution1(5)); // 15
console.log(sumToNSolution2(5)); // 15
console.log(sumToNSolution3(5)); // 15

console.log(sumToNSolution1(4)); // 10
console.log(sumToNSolution2(4)); // 10
console.log(sumToNSolution3(4)); // 10
