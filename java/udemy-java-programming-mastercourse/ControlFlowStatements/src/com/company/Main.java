package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println(getLargestPrime(45));
    }

    public static int getLargestPrime(int number) {
        if (number <= 0 || number == 1 ) return -1;
        int divisor = 2;
        int target = number;
        while ((double)(divisor) <= (double)(target) / (double)(divisor)) {
            int remain = target % divisor;
            if (remain == 0) {
                target /= divisor;
                divisor = 2;
            } else {
                divisor ++;
            }
        }
        return target;
    }
}
