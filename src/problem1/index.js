//1. Using a Loop
function sum_to_n(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

//2. Using the Arithmetic Progression Formula
function sum_to_n(n) {
    return (n * (n + 1)) / 2;
}

//3. Using Recursion
function sum_to_n(n) {
    if (n === 0) return 0;
    return n + sum_to_n(n - 1);
}