function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 0; i <= n; i++) {
        sum += i;
    }
    console.log(sum);
    return sum;
}
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}
function sum_to_n_c(n) {
    if (n === 1)
        return 1;
    return n + sum_to_n_c(n - 1);
}
sum_to_n_a(5);
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
