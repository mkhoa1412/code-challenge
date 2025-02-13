/**
 * Time complexity: O(1)
 * Space complexity: O(1)
 */
const sumToN_1 = (n: number) => {
    const _n = BigInt(n);
    return (_n + 1n) * _n / 2n;
}

/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const sumToN_2 = (n: number) => {
    let sum = 0n;
    for (let i = 1; i <= n; i++) {
        sum += BigInt(i);
    }

    return sum;
}

/**
 * Time complexity: O(n) (although slower than sumToN_2
 *      because of some additional operation & callstack depth)
 * 
 * Space complexity: O(1)
 * 
 * Not splitting but calling recursive directly 
 *      will cause stack trace err with large num
 */
const sumToN_3 = (n: number | bigint, start: bigint = BigInt(0)) => {
    let _n = BigInt(n);
    const range = (_n - start);
    if (range < 100n) {
        let res = 0n;
        for (let i = start; i <= _n; i++) {
            res += i;
        }

        return res;
    }

    const isEven = range % 2n === 0n;
    const rangeMid = isEven ? (range / 2n) : (range + 1n) / 2n;
    const mid = start + rangeMid;
    return sumToN_3(mid, start) + sumToN_3(_n, mid + 1n);
}

const tests = [
    [4, 10],
    [9, 45],
    [10, 55],
    [99, 4950],
    [100, 5050],
    [97, 4753],
    [1000, 500500],
    [1001, 501501],
    [3_000_001, 4500004500001n],
    [50_000_000, 1250000025000000n],
    [50_000_010, 1250000525000055n],
    [100_000_001, 5000000150000001n],
    [1_000_000_000, 500000000500000000n],
];

const doTest = (fn, input, expectation, index, label: string) => {
    const _timeKey = `${label}_${input}`;
    console.log(`--- Start fn: ${label}`);
    console.time(_timeKey);
    const _e = BigInt(expectation);
    const res = BigInt(fn(input));
    console.log(`${label} ${res == _e} | Input: ${input} | E:${_e} vs ${res} | ${label}`);

    console.timeEnd(_timeKey);
    return res;
}

tests.forEach(([input, expectation], testIndex) => {
    console.log(`\n>>> Start test ${testIndex}: ${input}`);
    const bExpectation = BigInt(expectation);
    const sumToN_1Res = doTest(sumToN_1, input, expectation, testIndex, 'sumToN_1');
    const sumToN_2Res = doTest(sumToN_2, input, expectation, testIndex, 'sumToN_2');
    const sumToN_3Res = doTest(sumToN_3, input, expectation, testIndex, 'sumToN_3');
    let isSame = sumToN_1Res == bExpectation &&
        sumToN_2Res == bExpectation &&
        sumToN_3Res == bExpectation;

    console.log(`Res Same: ${isSame}, ${input} --> ${bExpectation}
    | sumToN_1: ${sumToN_1Res}
    | sumToN_2: ${sumToN_2Res}
    | sumToN_3: ${sumToN_3Res}
`);
    if(!isSame) {
        throw new Error('Invalid expectation');
    }
});