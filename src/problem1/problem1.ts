/*
Since we use React & Typescript, I create a ts file in case
*/

function sum_to_n_x(n: number): number {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
};

function sum_to_n_y(n: number): number {
    return (n * (n + 1)) / 2;
};

function sum_to_n_z(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
};

// sum_to_n_x()
console.log(sum_to_n_x(0)) // 0
console.log(sum_to_n_x(5.99)) // 15
console.log(sum_to_n_x(5)) // 55
// console.log(sum_to_n_x(Number.MAX_SAFE_INTEGER))

// sum_to_n_b()
console.log(sum_to_n_b(0)) // 0
console.log(sum_to_n_b(5.99)) // 15
console.log(sum_to_n_b(5)) // 55
console.log(sum_to_n_b(Number.MAX_SAFE_INTEGER)) // very fast, give the correct result - 4.0564819207303336e+31

// sum_to_n_c()
console.log(sum_to_n_c(0)) // 0
console.log(sum_to_n_c(5.99)) // 15
console.log(sum_to_n_c(5)) // 55