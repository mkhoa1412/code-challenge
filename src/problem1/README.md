# Problem 1: Three Ways to Sum to N

## Overview

This problem implements three unique approaches to calculate the sum of integers from 1 to n (inclusive). Each implementation demonstrates different algorithmic strategies with varying time and space complexities.

**TypeScript Implementation:** This solution is implemented in TypeScript, providing static type checking, better IDE support, and enhanced code reliability while maintaining compatibility with JavaScript environments.

**Function Signature:**
```typescript
function sum_to_n(n: number): number
```

**Expected Behavior:**
- Input: `n` - any number (integer)
- Output: sum of integers from 1 to n (1 + 2 + 3 + ... + n)
- Example: `sum_to_n(5)` returns `15` (1 + 2 + 3 + 4 + 5)

## Implementations

### Approach 1: Mathematical Formula (`sum_to_n_a`)

**Algorithm:** Uses the arithmetic series formula: `n × (n + 1) ÷ 2`

**Time Complexity: O(1) - Constant time**
**Space Complexity: O(1) - Constant space**

**Characteristics:**
- ✅ Most efficient approach
- ✅ Direct mathematical calculation
- ✅ Best for large values of n
- ✅ No loops or recursion
- ⚠️ Risk of integer overflow for very large n

**Mathematical Background:**
The sum of an arithmetic sequence is given by the formula:
```
S = n/2 × (first_term + last_term)
S = n/2 × (1 + n)
S = n × (n + 1) / 2
```

### Approach 2: Iterative Loop (`sum_to_n_b`)

**Algorithm:** Uses a for loop to accumulate the sum from 1 to n

**Time Complexity: O(n) - Linear time**
**Space Complexity: O(1) - Constant space**

**Characteristics:**
- ✅ Simple and intuitive
- ✅ Easy to understand and debug
- ✅ Good for educational purposes
- ✅ Handles edge cases naturally
- ❌ More operations than formula approach
- ✅ Safe from overflow until final result

**Implementation Pattern:**
```typescript
let sum: number = 0;
for (let i: number = 1; i <= n; i++) {
    sum += i;
}
return sum;
```

### Approach 3: Recursive (`sum_to_n_c`)

**Algorithm:** Uses recursion with the relation: `sum(n) = n + sum(n-1)`

**Time Complexity: O(n) - Linear time (n recursive calls)**
**Space Complexity: O(n) - Linear space (call stack depth)**

**Characteristics:**
- ✅ Elegant mathematical representation
- ✅ Demonstrates divide-and-conquer thinking
- ✅ Good for understanding recursion
- ❌ Risk of stack overflow for large n
- ❌ Function call overhead
- ❌ Highest memory usage

**Recursive Relation:**
```
sum(n) = n + sum(n-1)
sum(1) = 1 (base case)
sum(0) = 0 (base case)
```

## Performance Comparison

| Approach | Time Complexity | Space Complexity | Best Use Case |
|----------|----------------|------------------|---------------|
| Formula  | O(1)           | O(1)             | Production code, large n |
| Iterative| O(n)           | O(1)             | Educational, debugging |
| Recursive| O(n)           | O(n)             | Learning recursion, small n |



## Files Structure

```
src/problem1/
├── sum_to_n.ts          # Main TypeScript implementations
├── test.ts              # Comprehensive test suite
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── dist/                # Compiled JavaScript output
├── README.md            # This documentation
└── node_modules/        # Dependencies
```

## Usage

### TypeScript Environment

```typescript
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './sum_to_n';

console.log(sum_to_n_a(5));  // 15
console.log(sum_to_n_b(5));  // 15
console.log(sum_to_n_c(5));  // 15
```

### Node.js Environment (Compiled)

```javascript
const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./dist/sum_to_n.js');

console.log(sum_to_n_a(5));  // 15
console.log(sum_to_n_b(5));  // 15
console.log(sum_to_n_c(5));  // 15
```

### Browser Environment

```html
<script src="dist/sum_to_n.js"></script>
<script>
    console.log(sum_to_n_a(5));  // 15
    console.log(sum_to_n_b(5));  // 15
    console.log(sum_to_n_c(5));  // 15
</script>
```

## Building and Running

### Install Dependencies
```bash
npm install
```

### Compile TypeScript
```bash
npx tsc
```

### Running Tests

#### Direct TypeScript execution
```bash
npx ts-node test.ts
```

#### Compiled JavaScript
```bash
npx tsc && node dist/test.js
```

## Test Cases

The test suite includes:

1. **Basic Cases:** Common inputs (1, 2, 3, 4, 5, 10, 100)
2. **Edge Cases:** Zero, negative numbers
3. **Large Cases:** Performance testing with large inputs
4. **Performance Tests:** Comparing execution times

## Edge Case Handling

All implementations handle the following edge cases:

- `n = 0`: Returns `0`
- `n < 0`: Returns `0` (treating negative as invalid input)
- `n = 1`: Returns `1`

## Limitations

1. **Integer Overflow:** All approaches are limited by TypeScript/JavaScript's `Number.MAX_SAFE_INTEGER`
2. **Stack Overflow:** Recursive approach fails for large n (typically n > 10,000)
3. **Performance:** Only the formula approach is truly efficient for large inputs

## When to Use Each Approach

- **Use Formula (`sum_to_n_a`)** for production code and performance-critical applications
- **Use Iterative (`sum_to_n_b`)** for educational purposes or when you need to understand step-by-step execution
- **Use Recursive (`sum_to_n_c`)** for learning recursion concepts or when working with small inputs

## Mathematical Verification

For n = 5:
- Manual calculation: 1 + 2 + 3 + 4 + 5 = 15
- Formula: 5 × (5 + 1) ÷ 2 = 5 × 6 ÷ 2 = 15
- All implementations should return 15

## Contributing

When modifying the implementations:

1. Ensure all three functions maintain the same behavior
2. Run the complete test suite
3. Update documentation if complexity characteristics change
4. Consider edge cases and performance implications