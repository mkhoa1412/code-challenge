## Problem 4: 3 ways to sum

- Time finished: 2 - 3 minutes

### First solution:

- Using a loop to iterate and sum from 1 -> n

Time complexity: O(n)\
Space complexity: O(1)

### Second solution:

- Recursive.
- By doing recursive, we're accidentally making a stack of callers causing the space complexity to be O(n)

Time complexity: O(n)\
Space complexity: O(n) 

### Third solution:

- Using formula (n * (n +1)) / 2

Time complexity: O(1)\
Space complexity: O(1) 