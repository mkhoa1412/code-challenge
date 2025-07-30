/**
 * Test Suite for Problem 1: Three Ways to Sum to N
 *
 */
/**
 * Test runner utility
 */
declare class TestRunner {
    private passed;
    private failed;
    private total;
    constructor();
    assert(condition: boolean, message: string): void;
    assertEqual(actual: number, expected: number, message: string): void;
    runAllTests(): void;
    testBasicCases(): void;
    testEdgeCases(): void;
    testLargeCases(): void;
    testPerformance(): void;
    printSummary(): void;
}
export { TestRunner };
