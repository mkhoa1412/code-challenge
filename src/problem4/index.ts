//Complexity: O(n)
function sum_to_n_a(n: number): number {
    let sum : number = 0
    for (let i = 1; i<= n; i++) {
        sum +=i
    }
    return sum
}
console.log(sum_to_n_a(5))

//Complexity: O(1)
function sum_n_to_b(n: number): number {
    let sum = ((n + 1) * n)/2
    return sum
}
console.log(sum_n_to_b(5))

//Complexity: O(n)
function sum_n_to_c(n: number): number {
    if (n === 0) return 0;
    return n + sum_n_to_c(n - 1)
}
console.log(sum_n_to_c(5))