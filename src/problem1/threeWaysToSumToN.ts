// O(1) time complexity
// Simple math formula to calculate sum of N number
export const sumToNFirstSolution = (n: number): number => {
  if (n < 0 || isNaN(n)) return 0;
  return (n * (n + 1)) / 2;
};

// O(n) time complexity
// Simple loop to calculate sum of N number
export const sumToNSecondSolution = (n: number): number => {
  if (n < 0 || isNaN(n)) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Can increase this number depend on the machine
const maxItemPerProcess = 100;

// O(n) time complexity
// Recursive function to calculate sum of N number
// This solution is to prevent stack overflow when n is too large
export const sumToNThirdSolution = (n: number): number => {
  if (n < 0 || isNaN(n)) return 0;

  const sumHelper = (n: number, excludeValue: number = 0): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === excludeValue) return 0;
    return sumHelper(n - 1, excludeValue) + n;
  };

  const processNeeded = Math.floor(n / maxItemPerProcess);

  let sum = 0;
  if (processNeeded > 0) {
    for (let i = 1; i <= processNeeded; i++) {
      sum += sumHelper(maxItemPerProcess * i, maxItemPerProcess * (i - 1));
    }
  }

  return sum + sumHelper(n, maxItemPerProcess * processNeeded);
};
