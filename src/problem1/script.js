const sum_to_n_a = function(n) {
    // using loop
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }

    return total;
};

const sum_to_n_b = function(n) {
    // use the recursion
    if (n === 0) {
        return 0;
    }
    
    return n + sum_to_n_b(n - 1);
};

const sum_to_n_c = function(n) {
    // using Reduce
    return Array.from({ length: n }, (_, i) => {
                    return i + 1;
                }).reduce((acc, curr) => {
                    return acc + curr;
                }, 0);
        };

const calc_sum_by = function(method_index, n) {
    switch(method_index) {
        case 1:
            alert(`sum_to_n_a(${n}) = ${sum_to_n_a(n)}`);
            break;
        case 2:
            alert(`sum_to_n_b(${n}) = ${sum_to_n_b(n)}`);
            break;
        case 3:
            alert(`sum_to_n_c(${n}) = ${sum_to_n_c(n)}`);
            break;
    }
}