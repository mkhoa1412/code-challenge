/**
 * Problem 4: Sum to N - Three Unique JavaScript Implementations
 * 
 * Task: Calculate the sum from 1 to n using three different approaches
 * Input: n - any integer (assumes result < Number.MAX_SAFE_INTEGER)
 * Output: summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15
 * 
 * To run: node sum_to_n.js
 */

/**
 * Implementation A: Mathematical Formula (Gauss Formula)
 * 
 * Uses the closed-form arithmetic series formula: n * (n + 1) / 2
 * This is based on Carl Friedrich Gauss's famous discovery.
 * 
 * Time Complexity: O(1) - Constant time execution
 * Space Complexity: O(1) - Constant memory usage
 * 
 * Efficiency: HIGHEST - Single arithmetic operation regardless of input size
 * 
 * Pros:
 * - Fastest execution time
 * - No loops or recursion overhead
 * - Handles very large numbers efficiently
 * - Mathematically elegant
 * 
 * Cons:
 * - Requires mathematical knowledge
 * - Less intuitive for junior developers
 */
function sum_to_n_a(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    
    // Apply Gauss formula: n * (n + 1) / 2
    return (n * (n + 1)) / 2;
}

/**
 * Implementation B: Iterative Approach with For Loop
 * 
 * Traditional imperative approach using a for loop to accumulate the sum.
 * This directly implements the mathematical definition of summation.
 * 
 * Time Complexity: O(n) - Linear time proportional to input
 * Space Complexity: O(1) - Constant memory usage
 * 
 * Efficiency: MEDIUM - Good balance of readability and performance
 * 
 * Pros:
 * - Highly readable and intuitive
 * - Easy to debug and modify
 * - Familiar to most developers
 * - Good for educational purposes
 * 
 * Cons:
 * - Slower for large inputs
 * - Performs n iterations
 * - More CPU cycles than mathematical approach
 */
function sum_to_n_b(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    
    let sum = 0;
    
    // Iterate from 1 to n and accumulate sum
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    
    return sum;
}

/**
 * Implementation C: Recursive Approach
 * 
 * Uses recursion to break down the problem into smaller subproblems.
 * sum_to_n(n) = n + sum_to_n(n-1), with base case sum_to_n(0) = 0
 * 
 * Time Complexity: O(n) - Linear time due to n recursive calls
 * Space Complexity: O(n) - Linear space due to call stack depth
 * 
 * Efficiency: LOWEST - Highest memory usage and function call overhead
 * 
 * Pros:
 * - Elegant functional programming style
 * - Demonstrates recursion concepts
 * - Self-documenting recursive structure
 * - Good for algorithm education
 * 
 * Cons:
 * - Risk of stack overflow for large n
 * - Higher memory usage due to call stack
 * - Function call overhead
 * - Not suitable for production with large inputs
 */
function sum_to_n_c(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    // Recursive case: n + sum(n-1)
    return n + sum_to_n_c(n - 1);
}

function performanceTest() {
    console.log("⚡ Performance Comparison");
    console.log("========================");

    const testSizes = [1000, 100000];

    testSizes.forEach(n => {
        console.log(`\nTesting with n = ${n.toLocaleString()}:`);

        try {
            console.time("  Formula (A)");
            const resultA = sum_to_n_a(n);
            console.log(`  Formula (A): ${resultA}`);
            console.timeEnd("  Formula (A)");
        } catch(error) {
            console.log(`  Formula (A): ${error.message}`);
        }

        // Test Iterative approach
        try {
            console.time("  Iterative (B)");
            const resultB = sum_to_n_b(n);
            console.log(`  Iterative (B): ${resultB}`);
            console.timeEnd("  Iterative (B)");
        } catch(error) {
            console.log(`  Iterative (B): ${error.message}`);
        }

        // Test Recursive approach
        try {
            console.time("  Recursive (C)");
            const resultC = sum_to_n_c(n);
            console.log(`  Recursive (C): ${resultC}`);
            console.timeEnd("  Recursive (C)");
        } catch(error) {
            console.log(`  Recursive (C): ${error.message}`);
        }
    });
}

function demonstrateComplexity() {
    console.log("\n📊 Complexity Analysis Summary");
    console.log("==============================");
    console.log("sum_to_n_a (Formula):   O(1) time, O(1) space - BEST for production");
    console.log("sum_to_n_b (Iterative): O(n) time, O(1) space - GOOD for readability");
    console.log("sum_to_n_c (Recursive): O(n) time, O(n) space - EDUCATIONAL purposes");
    console.log();
    console.log("💡 Recommendation: Use sum_to_n_a for optimal performance");
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
    console.log("Sum to N Challenge - JavaScript Implementation");
    console.log("==============================================");
    console.log();

    performanceTest();

    demonstrateComplexity();
}

main();
