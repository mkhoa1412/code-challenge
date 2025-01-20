// Cách 1: Sử dụng mảng và phương thức reduce
var sum_to_n_d = function(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
};

// Cách 2: Sử dụng vòng lặp for
var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Cách 3: Sử dụng đệ quy đuôi
var sum_to_n_e = function(n, acc = 0) {
    if (n === 0) return acc;
    return sum_to_n_e(n - 1, acc + n);
};
