/**
 * Test Suite for Problem 1: Three Ways to Sum to N
 *
 */

// Import the functions from our TypeScript module
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './sum_to_n';

// Type declarations for browser/Node.js compatibility
declare const require: any;
declare const module: any;

// Function type definitions
type SumFunction = (n: number) => number;

interface TestCase {
    input: number;
    expected: number;
}

/**
 * Test runner utility
 */
class TestRunner {
    private passed: number;
    private failed: number;
    private total: number;

    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.total = 0;
    }

    assert(condition: boolean, message: string): void {
        this.total++;
        if (condition) {
            this.passed++;
            console.log(`✅ PASS: ${message}`);
        } else {
            this.failed++;
            console.log(`❌ FAIL: ${message}`);
        }
    }

    assertEqual(actual: number, expected: number, message: string): void {
        this.assert(actual === expected,
            `${message} - Expected: ${expected}, Got: ${actual}`);
    }

    runAllTests(): void {
        console.log('🧪 Running Test Suite for Problem 1\n');

        this.testBasicCases();
        this.testEdgeCases();
        this.testLargeCases();
        this.testPerformance();

        this.printSummary();
    }

    testBasicCases(): void {
        console.log('📋 Testing Basic Cases:');

        const testCases: TestCase[] = [
            { input: 1, expected: 1 },
            { input: 2, expected: 3 },
            { input: 3, expected: 6 },
            { input: 4, expected: 10 },
            { input: 5, expected: 15 },
            { input: 10, expected: 55 },
            { input: 100, expected: 5050 }
        ];

        testCases.forEach(({ input, expected }: TestCase) => {
            this.assertEqual(sum_to_n_a(input), expected,
                `sum_to_n_a(${input})`);
            this.assertEqual(sum_to_n_b(input), expected,
                `sum_to_n_b(${input})`);
            this.assertEqual(sum_to_n_c(input), expected,
                `sum_to_n_c(${input})`);
        });

        console.log('');
    }

    testEdgeCases(): void {
        console.log('🔍 Testing Edge Cases:');

        this.assertEqual(sum_to_n_a(0), 0, 'sum_to_n_a(0)');
        this.assertEqual(sum_to_n_a(-1), 0, 'sum_to_n_a(-1)');
        this.assertEqual(sum_to_n_a(-10), 0, 'sum_to_n_a(-10)');

        this.assertEqual(sum_to_n_b(0), 0, 'sum_to_n_b(0)');
        this.assertEqual(sum_to_n_b(-1), 0, 'sum_to_n_b(-1)');
        this.assertEqual(sum_to_n_b(-10), 0, 'sum_to_n_b(-10)');

        this.assertEqual(sum_to_n_c(0), 0, 'sum_to_n_c(0)');
        this.assertEqual(sum_to_n_c(-1), 0, 'sum_to_n_c(-1)');
        this.assertEqual(sum_to_n_c(-10), 0, 'sum_to_n_c(-10)');

        console.log('');
    }

    testLargeCases(): void {
        console.log('📊 Testing Large Cases:');

        const largeCases: number[] = [1000, 5000, 10000];

        largeCases.forEach((n: number) => {
            const expected: number = (n * (n + 1)) / 2;

            this.assertEqual(sum_to_n_a(n), expected,
                `sum_to_n_a(${n})`);
            this.assertEqual(sum_to_n_b(n), expected,
                `sum_to_n_b(${n})`);

            // Skip recursive test for very large numbers to avoid stack overflow
            if (n <= 1000) {
                this.assertEqual(sum_to_n_c(n), expected,
                    `sum_to_n_c(${n})`);
            } else {
                console.log(`⚠️  SKIP: sum_to_n_c(${n}) - Stack overflow risk`);
            }

        });

        console.log('');
    }

    testPerformance(): void {
        console.log('⚡ Performance Comparison:');

        const n: number = 10000;
        const iterations: number = 1000;

        // Test formula approach
        const startA: number = performance.now();
        for (let i: number = 0; i < iterations; i++) {
            sum_to_n_a(n);
        }
        const timeA: number = performance.now() - startA;

        // Test iterative approach
        const startB: number = performance.now();
        for (let i: number = 0; i < iterations; i++) {
            sum_to_n_b(n);
        }
        const timeB: number = performance.now() - startB;

         // Test recursive approach (smaller n to avoid stack overflow)
         const smallN: number = 1000;
         const startC: number = performance.now();
         for (let i: number = 0; i < iterations; i++) {
             sum_to_n_c(smallN);
         }
         const timeC: number = performance.now() - startC;

         console.log(`Formula approach (n=${n}): ${timeA.toFixed(2)}ms`);
         console.log(`Iterative approach (n=${n}): ${timeB.toFixed(2)}ms`);
         console.log(`Recursive approach (n=${smallN}): ${timeC.toFixed(2)}ms`);

         console.log('');
    }

    printSummary(): void {
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

// Browser compatibility
declare const window: any;

if (typeof window === 'undefined' || window.location.pathname.includes('test')) {
    const runner: TestRunner = new TestRunner();
    runner.runAllTests();
}

if (typeof window !== 'undefined') {
    window.TestRunner = TestRunner;
}

// Export for ES6 modules
export { TestRunner };