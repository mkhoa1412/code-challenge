// Implementation A: Mathematical formula
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}

// Implementation B: Iterative approach
function sum_to_n_a(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Implementation C: Recursion
function sum_to_n_c(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
}