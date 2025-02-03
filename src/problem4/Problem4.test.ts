// Problem4.test.ts
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./Problem4";

describe("sum_to_n functions", () => {
	test("sum_to_n_a should return the correct sum for n = 5", () => {
		expect(sum_to_n_a(5)).toBe(15);
	});

	test("sum_to_n_b should return the correct sum for n = 5", () => {
		expect(sum_to_n_b(5)).toBe(15);
	});

	test("sum_to_n_c should return the correct sum for n = 5", () => {
		expect(sum_to_n_c(5)).toBe(15);
	});

	// Additional edge cases and tests
	test("sum_to_n_a should return 0 for n = 0", () => {
		expect(sum_to_n_a(0)).toBe(0);
	});

	test("sum_to_n_b should return 0 for n = 0", () => {
		expect(sum_to_n_b(0)).toBe(0);
	});

	test("sum_to_n_c should return 0 for n = 0", () => {
		expect(sum_to_n_c(0)).toBe(0);
	});

	test("sum_to_n_a should return 1 for n = 1", () => {
		expect(sum_to_n_a(1)).toBe(1);
	});

	test("sum_to_n_b should return 1 for n = 1", () => {
		expect(sum_to_n_b(1)).toBe(1);
	});

	test("sum_to_n_c should return 1 for n = 1", () => {
		expect(sum_to_n_c(1)).toBe(1);
	});
});
