package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println("The sum of the digits in number 125 is " + sumDigits(125));

        System.out.println(isPalindrome(11));
    }

    public static int sumDigits (int number) {
        int sum = 0;

        if (number < 10) {
            return -1;
        }

        while (number > 0) {
            sum += number % 10;
            number /= 10;
        }

        return sum;
    }

    public static int isPalindrome (int number) {
        int reverse = 0;
        int localNumber = number;
        while (localNumber != 0) {
            reverse += (localNumber % 10 + reverse * 10);
            localNumber /= 10;
        }
        return reverse;
    }
}
