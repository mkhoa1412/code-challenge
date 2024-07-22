
//Using the math formula to calculate the sum of an arranged series of numbers, the numbers have the same distance and end at number n
var sum_to_n_a = function (n) {
    return n > 0 ? ((n + 1) * n) / 2 : 0
}

//Using for loop
var sum_to_n_b = function (n) {
    let sum = 0
    for (let index = 0; index <= n; index++)
        sum += index
    return sum
};

//Using while loop
var sum_to_n_c = function (n) {
    let index = 0
    let sum = 0
    while (index <= n) {
        sum += index++
    }
    return sum
};

//In case sum_to_n_b and sum_to_n_c are judged to be the same because all of them are used loop conditions
//Using recursive functions
var sum_to_n_d = function (n) {
    return n > 0 ? n > 1 ? n + sum_to_n_d(--n) : n : 0
};
