/*Problem 4: Three ways to sum to n */

// Approach 1: Iterative (Loop-based)
export function sum_to_n_a(n: number): number {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
}

// Approach 2: Mathematical Formula
export function sum_to_n_b(n: number): number {
	return (n * (n + 1)) / 2;
}

// Approach 3: Recursive Solution
export function sum_to_n_c(n: number): number {
	if (n <= 1) return n;
	return n + sum_to_n_c(n - 1);
}

// Test case
// console.log(sum_to_n_a(5)); // 15
// console.log(sum_to_n_b(5)); // 15
// console.log(sum_to_n_c(5)); // 15
