/**
 * Test Suite for Problem 1: Three Ways to Sum to N
 *
 */

let sum_to_n_a;

if (typeof require !== 'undefined') {
    const functions = require('./sum_to_n.js');
    sum_to_n_a = functions.sum_to_n_a;
}

/**
 * Test runner utility
 */
class TestRunner {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.total = 0;
    }

    assert(condition, message) {
        this.total++;
        if (condition) {
            this.passed++;
            console.log(`✅ PASS: ${message}`);
        } else {
            this.failed++;
            console.log(`❌ FAIL: ${message}`);
        }
    }

    assertEqual(actual, expected, message) {
        this.assert(actual === expected,
            `${message} - Expected: ${expected}, Got: ${actual}`);
    }

    runAllTests() {
        console.log('🧪 Running Test Suite for Problem 1\n');

        this.testBasicCases();
        this.testEdgeCases();
        this.testLargeCases();
        this.testPerformance();

        this.printSummary();
    }

    testBasicCases() {
        console.log('📋 Testing Basic Cases:');

        const testCases = [
            { input: 1, expected: 1 },
            { input: 2, expected: 3 },
            { input: 3, expected: 6 },
            { input: 4, expected: 10 },
            { input: 5, expected: 15 },
            { input: 10, expected: 55 },
            { input: 100, expected: 5050 }
        ];

        testCases.forEach(({ input, expected }) => {
            this.assertEqual(sum_to_n_a(input), expected,
                `sum_to_n_a(${input})`);
        });

        console.log('');
    }

    testEdgeCases() {
        console.log('🔍 Testing Edge Cases:');

        this.assertEqual(sum_to_n_a(0), 0, 'sum_to_n_a(0)');

        this.assertEqual(sum_to_n_a(-1), 0, 'sum_to_n_a(-1)');

        this.assertEqual(sum_to_n_a(-10), 0, 'sum_to_n_a(-10)');
    }

    testLargeCases() {
        console.log('📊 Testing Large Cases:');

        const largeCases = [1000, 5000, 10000];

        largeCases.forEach(n => {
            const expected = (n * (n + 1)) / 2;

            this.assertEqual(sum_to_n_a(n), expected,
                `sum_to_n_a(${n})`);
        });
    }

    testPerformance() {
        console.log('⚡ Performance Comparison:');

        const n = 10000;
        const iterations = 1000;

        // Test formula approach
        const startA = performance.now();
        for (let i = 0; i < iterations; i++) {
            sum_to_n_a(n);
        }
        const timeA = performance.now() - startA;

        console.log(`Formula approach (n=${n}): ${timeA.toFixed(2)}ms`);
    }

    printSummary() {
        console.log('📊 Test Summary:');
        console.log(`Total tests: ${this.total}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Success rate: ${((this.passed / this.total) * 100).toFixed(1)}%`);

        if (this.failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log('❌ Some tests failed. Please review the implementation.');
        }
    }
}

if (typeof window === 'undefined' || window.location.pathname.includes('test')) {
    const runner = new TestRunner();
    runner.runAllTests();
}

if (typeof window !== 'undefined') {
    window.TestRunner = TestRunner;
}