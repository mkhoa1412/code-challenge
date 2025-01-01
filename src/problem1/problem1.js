/*
My assumptions:
- If n is negative, return result = 0
- If n is 0, return result = 0
- Assume n is 5.99, it will be converted to 5
*/

// O(n)
// The first approach that I thought: using loop
var sum_to_n_a = function(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
};

// O(1)
// The second approach that I thought: using the formula for sum of first n natural numbers
var sum_to_n_b = function(n) {
    if (n <= 0) return 0;
    n = Math.floor(n); // Assume n is 5.99, it will be converted to 5
    return (n * (n + 1)) / 2;
};

// O(n)
// The third approach that I thought: using recursion
var sum_to_n_c = function(n) {
    if (n <= 0) return 0;
    n = Math.floor(n); // Assume n is 5.99, it will be converted to 5
    return n + sum_to_n_c(n - 1);
};


// Results
// sum_to_n_a()
console.log(sum_to_n_a(-1)) // 0
console.log(sum_to_n_a(0)) // 0
console.log(sum_to_n_a(5.99)) // 15
console.log(sum_to_n_a(5)) // 15
    // console.log(sum_to_n_a(Number.MAX_SAFE_INTEGER)) // very slow, but still give the correct result. I will comment this line in case it makes the test run too long

// sum_to_n_b()
console.log(sum_to_n_b(-1)) // 0
console.log(sum_to_n_b(0)) // 0
console.log(sum_to_n_b(5.99)) // 15
console.log(sum_to_n_b(5)) // 15
console.log(sum_to_n_b(Number.MAX_SAFE_INTEGER)) // very fast, give the correct result - 4.0564819207303336e+31

// sum_to_n_c()
console.log(sum_to_n_c(-1)) // 0
console.log(sum_to_n_c(0)) // 0
console.log(sum_to_n_c(5.99)) // 15
console.log(sum_to_n_c(5)) // 15
    // console.log(sum_to_n_c(Number.MAX_SAFE_INTEGER)) // Max call stack size exceeded

/*
There is other approaches: While Loop, Bitwise Operators,...
I thought using the Formula/Bitwise Operators method (O(1)) is the fastest and efficient.
*/