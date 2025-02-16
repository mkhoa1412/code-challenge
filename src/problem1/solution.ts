const sum_to_n_a = (n: number): number =>
	[...Array(n)].reduce((acc, _, index) => acc + index + 1, 0);

const sum_to_n_b = (n: number): number => (n * (n + 1)) / 2;

const sum_to_n_c = (n: number): number => {
	if (n <= 0) return 0;

	return n + sum_to_n_c(n - 1);
};

console.log(`Solution 1: ${sum_to_n_a(5)}`);
console.log(`Solution 2: ${sum_to_n_b(5)}`);
console.log(`Solution 3: ${sum_to_n_c(5)}`);
