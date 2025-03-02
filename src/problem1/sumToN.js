// Using loop
var sum_to_n_a = function (n) {
    let sum = n; 
    while (--n) sum += n; 
    return sum;
};

// Using Reduce function
var sum_to_n_b = function (n) {
    return [...Array(n)].reduce((sum, _, i) => sum + (i + 1), 0);
}

// Avoid loop method
var sum_to_n_c = function (n) {
    return (n * (n + 1)) / 2;
};




console.log('1', sum_to_n_a(5))
console.log('2', sum_to_n_b(5))
console.log('3', sum_to_n_c(5))