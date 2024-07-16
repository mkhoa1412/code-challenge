
//Using the math formula to calculate the sum of an arranged series of numbers, the numbers have the same distance and end at number n
var sum_to_n_a = function (n) {
    try {
        if (n < 0) throw "n is can not negative!";
        return ((n + 1) * n) / 2
    }
    catch (e) {
        return e;
    }
}

//Using for loop
var sum_to_n_b = function (n) {
    try {
        if (n < 0) throw "n is can not negative!";
        let sum = 0
        for (let index = 0; index <= n; index++)
            sum += index
        return sum
    }
    catch (e) {
        return e;
    }
};

//Using while loop
var sum_to_n_c = function (n) {
    try {
        if (n < 0) throw "n is can not negative!";
        let index = 0
        let sum = 0
        while (index <= n) {
            sum += index++
        }
        return sum
    }
    catch (e) {
        return e;
    }
};

//In case sum_to_n_b and sum_to_n_c are judged to be the same because all of them are used loop conditions
//Using recursive functions
var sum_to_n_d = function (n) {
    return n > 1 ? n + sum_to_n_c(--n) : n
};

console.log(sum_to_n_a(1000));
console.log(sum_to_n_b(1000));
console.log(sum_to_n_c(1000));
console.log(sum_to_n_d(1000));
