import java.util.Scanner;

public class Main {
    public int method3(int n) {
        // math

        // Time complexity: O(1).
        // Space complexity: O(1).
        return (n * (n + 1)) / 2;
    }

    public int method2(int n) {
        // dfs
        if (n == 0) return 0;

        // Time complexity: O(n).
        // Space complexity: O(n).
        return n + method2(n - 1);
    }

    // linear
    public int method1(int n) {
        int sum = 0;

        // Time complexity: O(n).
        // Space complexity: O(1).
        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        return sum;
    }

    public static void main(String[] args) {
        Main main = new Main();

        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();

        System.out.println(main.method3(n));
    }
}