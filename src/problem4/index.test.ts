import { describe, expect, test } from "@jest/globals";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from ".";

describe("Iterative approach (O(n))", () => {
  describe("Calculate sum of numbers from 1 to positive integer n", () => {
    test("should return correct sum for positive integer n", () => {
      const result = sum_to_n_a(5);
      expect(result).toBe(15);
    });
  });

  describe("Handle negative numbers", () => {
    test("should return 0 when input is negative", () => {
      const result = sum_to_n_a(-5);
      expect(result).toBe(0);
    });
  });
});

describe("Mathematical formula approach (O(1))", () => {
  describe("Calculate sum of first n positive integers using arithmetic sequence formula", () => {
    test("should return correct sum for positive integer n", () => {
      const result = sum_to_n_b(5);
      expect(result).toBe(15);
    });
  });

  describe("Verify the formula calculation for negative integer inputs", () => {
    test("should calculate the sum correctly for negative input", () => {
      const result = sum_to_n_b(-5);
      expect(result).toBe(10);
    });
  });
});

describe("Recursive approach (O(n))", () => {
  describe("Calculate sum of numbers from 1 to positive integer n using recursion", () => {
    test("should return sum of numbers from 1 to n for positive integer input", () => {
      const result = sum_to_n_c(5);
      expect(result).toBe(15);
    });
  });

  describe("Handle negative numbers", () => {
    test("should return 0 when input is negative", () => {
      const result = sum_to_n_c(-5);
      expect(result).toBe(0);
    });
  });
});
