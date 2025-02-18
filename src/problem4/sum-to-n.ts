import * as readline from 'readline';

// Input validation function
function validateInput(n: string | number): number {
    if (typeof n == "string") {
        if (!/^\d+$/.test(n.trim())) { 
            throw new Error("Input must be a valid number.");
        }
        n = Number(n);
    }
    if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) {
        throw new Error("Input must be a positive integer.");
    }

    return n;
}

// Iterative Approach (No Array Creation)
function sumToN_Iterative(n: number | string): number {
    const validN: number = validateInput(n);
    let sum = 0;
    for (let i = 1; i <= validN; i++) {
        sum += i;
    }
    return sum;
}
// Mathematical Formula (Using Type Casting for Bitwise Safety)
function sumToN_Math(n: number | string): number {
    const validN: number = validateInput(n);
    return (validN * (validN + 1)) / 2;
}
// Recursive Approach (Tail Call Optimization)
function sumToN_Recursive(n: number | string, accumulator: number = 0): number {
    const validN: number = validateInput(n);
    return (validN == 1) ? accumulator +1 : sumToN_Recursive(validN - 1, accumulator + validN);
}

// Main function to handle user input
function main(): void {
    const rl: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a positive integer to calculate sum to N: ", (input: string) => {
        try {
            console.log("\nCalculating sum...");
            console.log(`  - Iterative Sum: ${sumToN_Iterative(input)}`);
            console.log(`  - Math Formula Sum: ${sumToN_Math(input)}`);
            console.log(`  - Recursive Sum: ${sumToN_Recursive(input)}`);
        } catch (error) {
            console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            rl.close();
        }
    });
}
// Run the main function if executed directly
if (require.main === module) {
    main();
}