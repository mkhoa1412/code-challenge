import {
  sumToNFirstSolution,
  sumToNSecondSolution,
  sumToNThirdSolution
} from './threeWaysToSumToN';

const testCases = [
  0, 1, 2, 3, 4, 5, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000009
];
const expectedResults = [
  0, 1, 3, 6, 10, 15, 55, 5050, 500500, 50005000, 5000050000, 500000500000,
  50000005000000, 5000000950000045
];

[sumToNFirstSolution, sumToNSecondSolution, sumToNThirdSolution].forEach(
  (sumToN) => {
    describe(`${sumToNFirstSolution.name}`, () => {
      it('Should return correct sum of N number', () => {
        testCases.forEach((testCase, index) => {
          expect(sumToN(testCase)).toBe(expectedResults[index]);
        });
      });
      it('Should return 0 if N is less than 0', () => {
        expect(sumToN(-1)).toBe(0);
      });
      it('Should return 0 if N is not a number', () => {
        expect(sumToN('a' as any)).toBe(0);
      });
    });
  }
);
