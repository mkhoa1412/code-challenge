
// Iterative approach: Uses a loop to sum each number from 1 to n.
// Pros:
// - Simple and easy to understand.
// - Doesn't require complex formulas or logic.
// Cons:
// - Performance: O(n) time complexity, which can be slow for large n.
// - Risk of exceeding MAX_SAFE_INTEGER if n is very large.
function sum_to_n_a(n: number): number {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
		if (sum > Number.MAX_SAFE_INTEGER) {
			throw new Error("Sum exceeds maximum safe integer");
		}
	}
	return sum;
}

// Optimized summation using partial grouping.
// Pros:
// - Faster than the iterative approach: O(1) time complexity.
// - Groups numbers to minimize the number of operations.
// Cons:
// - Logic is more complex compared to the iterative method.
// - Slightly more prone to errors in implementation if not handled carefully.
function sum_to_n_b(n: number): number {
	const isEven = n % 2 === 0;
	const half = Math.floor(n / 2);
	let sum = 0;

	if (isEven) {
		sum = (n + 1) * half;
	} else {
		sum = (n + 1) * half + (half + 1);
	}

	if (sum > Number.MAX_SAFE_INTEGER) {
		throw new Error("Sum exceeds maximum safe integer");
	}
	return sum;
}

// Formula-based approach: Uses the arithmetic series formula n * (n + 1) / 2.
// Pros:
// - Fastest method with O(1) time complexity.
// - Simplest to implement once the formula is understood.
// - Avoids iterative overhead.
// Cons:
// - Requires knowledge of the formula.
// - Prone to arithmetic overflow for very large n.
function sum_to_n_c(n: number): number {
	const sum = n * (n + 1) / 2;
	if (sum > Number.MAX_SAFE_INTEGER) {
		throw new Error("Sum exceeds maximum safe integer");
	}
	return sum;
}

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
