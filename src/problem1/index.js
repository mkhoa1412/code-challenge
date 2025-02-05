/*
#Task
Provide 3 unique implementations of the following function in JavaScript.
**Input**: `n` - any integer
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

/*
Assumptions:
- If n is negative, return result = 0
- If n is 0, return result = 0
- If n is float, it will be converted to integer
*/

// Function A: Using the arithmetic sum formula
const sum_to_n_a = (n) => {
    // Using the arithmetic sum formula: Sum of the first n natural numbers: (n * (n + 1)) / 2
    return (n * (n + 1)) / 2;
};

// Function B: Iterative summation using a loop
const sum_to_n_b = (n) => {
    let sum = 0; // Initialize sum to 0
    for (let i = 1; i <= n; i++) { // Iterate through all numbers from 1 to n
        sum += i; // Add the current number to the sum
    }
    return sum; // Return the final sum
};

// Function C: Using Array.from() and reduce() to sum the numbers
const sum_to_n_c = (n) => {
    // Create a typed array from 1 to n and sum its elements
    const arr = new Int32Array(n);
    arr.forEach((_, i) => arr[i] = i + 1); // Fill array with values from 1 to n
    return arr.reduce((sum, num) => sum + num, 0);
};

// Test cases with timing for each function

const test_sum_to_n = (n) => {
    console.time("sum_to_n_a");
    console.log(`sum_to_n_a(${n}) = ${sum_to_n_a(n)}`); // Test function A
    console.timeEnd("sum_to_n_a");

    console.time("sum_to_n_b");
    console.log(`sum_to_n_b(${n}) = ${sum_to_n_b(n)}`); // Test function B
    console.timeEnd("sum_to_n_b");

    console.time("sum_to_n_c");
    console.log(`sum_to_n_c(${n}) = ${sum_to_n_c(n)}`); // Test function C
    console.timeEnd("sum_to_n_c");
};

// Running test cases for different values of n
test_sum_to_n(1); // Smallest input
test_sum_to_n(2); // Small case
test_sum_to_n(5); // Small value
test_sum_to_n(10); // Moderate value
test_sum_to_n(100); // Larger value
test_sum_to_n(1000); // Larger value
test_sum_to_n(10000); // Large number
test_sum_to_n(100000); // Very large number
test_sum_to_n(1000000); // Extremely large number
test_sum_to_n(10000000); // Even larger number
test_sum_to_n(100000000); // Test large boundary case
test_sum_to_n(1000000000); // Maximal input for a normal JavaScript integer. As can be seen from the results, Function sum_to_n_b and Function sum_to_n_c, they fail due to JavaScript's limitation with its Number type and have worst performance, which can only safely handle integers up to 2^53 - 1 (approximately 9 quintillion). For numbers larger than this, JavaScript loses precision, causing incorrect results or overflow errors. We can use BigInt in ES6 to solve this problem, but these solutions will work correctly with smaller inputs.