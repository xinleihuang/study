package com.company.mylibrary;

public class Series {
    public static long nSum(int n) {
        if (n >= 0) {
            return n * (n + 1) / 2;
        }
        return -1;
    }

    public static long factorial(int n) {
        if (n == 0) {
            return 1;
        }

        if (n == 1) {
            return 1;
        }

        return n * factorial(n - 1);
    }

    public static long fibonacci(int n) {
        if (n == 0) {
            return 0;
        } else if (n == 1) {
            return 1;
        }

        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
