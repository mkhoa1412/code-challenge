const iterationSum = (n) => {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

const recursiveSum = (n) => {
  if (n === 1) return 1;

  return n + recursiveSum(n - 1);
};

const whileLoopSum = (n) => {
  let sum = 0;
  let i = 1;

  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
};

console.log(iterationSum(5)); // 15
console.log(recursiveSum(6)); // 21
console.log(whileLoopSum(7)); // 28
